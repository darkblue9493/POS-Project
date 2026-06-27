const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");

const root = __dirname;
let dataDir = process.env.DATA_DIR || path.join(root, "data");
let dbPath = path.join(dataDir, "pos-db.json");
const port = Number(process.env.PORT || 4188);
const posPin = String(process.env.POS_PIN || "1234");
const sessions = new Map();
const sessionMaxAgeMs = 1000 * 60 * 60 * 16;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml"
};

const defaultDb = {
  menuVersion: "thomaston-raceway-2026-06-27",
  settings: {
    storeName: "Thomaston Raceway",
    taxRate: 8.25,
    receiptFooter: "Thank you for your order",
  },
  nextOrderNumber: 1001,
  orders: [],
  items: [
    { id: "bonein-box-2", name: "2 Piece Bone-In Box", category: "Krunch Box Bone-In", price: 8.09, tender: false },
    { id: "bonein-box-3", name: "3 Piece Bone-In Box", category: "Krunch Box Bone-In", price: 9.59, tender: false },
    { id: "bonein-box-4", name: "4 Piece Bone-In Box", category: "Krunch Box Bone-In", price: 11.09, tender: false },
    { id: "chicken-biscuit-2", name: "2 Piece Chicken w/ Biscuit", category: "Chicken & Biscuit", price: 6.19, tender: false },
    { id: "chicken-biscuit-3", name: "3 Piece Chicken w/ Biscuit", category: "Chicken & Biscuit", price: 8.09, tender: false },
    { id: "chicken-biscuit-4", name: "4 Piece Chicken w/ Biscuit", category: "Chicken & Biscuit", price: 10.09, tender: false },
    { id: "tender-box-3", name: "3 Piece Tender Box", category: "Krunch Box Tenders", price: 8.49, tender: true },
    { id: "tender-box-4", name: "4 Piece Tender Box", category: "Krunch Box Tenders", price: 10.49, tender: true },
    { id: "tender-box-6", name: "6 Piece Tender Box", category: "Krunch Box Tenders", price: 13.49, tender: true },
    { id: "tender-biscuit-3", name: "3 Piece Tender w/ Biscuit", category: "Tender & Biscuit", price: 7.49, tender: true },
    { id: "tender-biscuit-4", name: "4 Piece Tender w/ Biscuit", category: "Tender & Biscuit", price: 8.99, tender: true },
    { id: "tender-biscuit-6", name: "6 Piece Tender w/ Biscuit", category: "Tender & Biscuit", price: 11.49, tender: true },
    { id: "wings-5", name: "5 Piece Wings", category: "Wings", price: 7.99, tender: false },
    { id: "wings-10", name: "10 Piece Wings", category: "Wings", price: 14.99, tender: false },
    { id: "wings-20", name: "20 Piece Wings", category: "Wings", price: 24.99, tender: false },
    { id: "shrimp-5", name: "5 Piece Shrimp w/ Biscuit", category: "Shrimp", price: 4.99, tender: false },
    { id: "shrimp-10", name: "10 Piece Shrimp w/ Biscuit", category: "Shrimp", price: 7.99, tender: false },
    { id: "sandwich", name: "Chicken Sandwich", category: "Sandwiches", price: 4.99, tender: false },
    { id: "sandwich-combo", name: "Chicken Sandwich Combo", category: "Sandwiches", price: 6.99, tender: false },
    { id: "family-chicken-tenders", name: "Family Chicken & Tenders", category: "Family Meals", price: 42.99, tender: true },
    { id: "family-chicken-only", name: "Family Chicken Only", category: "Family Meals", price: 32.99, tender: false },
    { id: "family-tenders-only", name: "Family Tenders Only", category: "Family Meals", price: 29.99, tender: true },
    { id: "biscuit-1", name: "Honey Butter Biscuit (1)", category: "Biscuits", price: 0.99, tender: false },
    { id: "biscuit-2", name: "Honey Butter Biscuits (2)", category: "Biscuits", price: 1.79, tender: false },
    { id: "biscuit-6", name: "Honey Butter Biscuits (6)", category: "Biscuits", price: 4.59, tender: false },
    { id: "wedges-small", name: "Wedges Small", category: "Sides", price: 2.49, tender: false },
    { id: "wedges-large", name: "Wedges Large", category: "Sides", price: 3.99, tender: false },
    { id: "wedges-family", name: "Wedges Family", category: "Sides", price: 5.49, tender: false },
    { id: "mashed-small", name: "Mashed Potatoes Small", category: "Sides", price: 2.59, tender: false },
    { id: "mashed-large", name: "Mashed Potatoes Large", category: "Sides", price: 4.59, tender: false },
    { id: "beans-small", name: "Red Beans & Rice Small", category: "Sides", price: 2.59, tender: false },
    { id: "beans-large", name: "Red Beans & Rice Large", category: "Sides", price: 4.59, tender: false },
    { id: "mac-small", name: "Mac n Cheese Small", category: "Sides", price: 2.59, tender: false },
    { id: "mac-large", name: "Mac n Cheese Large", category: "Sides", price: 4.59, tender: false },
    { id: "jambalaya-small", name: "Jambalaya Small", category: "Sides", price: 2.59, tender: false },
    { id: "jambalaya-large", name: "Jambalaya Large", category: "Sides", price: 4.59, tender: false },
    { id: "ala-leg", name: "Leg", category: "A La Carte", price: 2.59, tender: false },
    { id: "ala-thigh", name: "Thigh", category: "A La Carte", price: 2.59, tender: false },
    { id: "ala-wing", name: "Wing", category: "A La Carte", price: 2.29, tender: false },
    { id: "ala-tender", name: "Tender", category: "A La Carte", price: 2.29, tender: true },
    { id: "only-chicken-8", name: "Only Chicken 8 Piece", category: "Only Chicken", price: 16.99, tender: false },
    { id: "only-chicken-12", name: "Only Chicken 12 Piece", category: "Only Chicken", price: 24.99, tender: false },
    { id: "only-chicken-16", name: "Only Chicken 16 Piece", category: "Only Chicken", price: 32.99, tender: false },
    { id: "only-tenders-8", name: "Only Tenders 8 Piece", category: "Only Tenders", price: 15.99, tender: true },
    { id: "only-tenders-12", name: "Only Tenders 12 Piece", category: "Only Tenders", price: 23.99, tender: true },
    { id: "only-tenders-16", name: "Only Tenders 16 Piece", category: "Only Tenders", price: 31.99, tender: true },
    { id: "nuggets-biscuit-6", name: "6 Nuggets w/ Biscuit", category: "Nuggets", price: 5.49, tender: false },
    { id: "nuggets-biscuit-10", name: "10 Nuggets w/ Biscuit", category: "Nuggets", price: 7.49, tender: false },
    { id: "nuggets-box-6", name: "6 Nuggets Krunch Box", category: "Nuggets", price: 6.99, tender: false },
    { id: "nuggets-box-10", name: "10 Nuggets Krunch Box", category: "Nuggets", price: 8.99, tender: false },
    { id: "nuggets-6", name: "6 Nuggets", category: "Nuggets", price: 4.99, tender: false },
    { id: "nuggets-10", name: "10 Nuggets", category: "Nuggets", price: 6.99, tender: false },
    { id: "corn-dog", name: "Corn Dog", category: "Misc", price: 1.99, tender: false },
    { id: "egg-roll", name: "Egg Roll", category: "Misc", price: 2.19, tender: false }
  ]
};

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, { "content-type": type });
  res.end(body);
}

function sendJson(res, status, data) {
  send(res, status, JSON.stringify(data), "application/json; charset=utf-8");
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Request is too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error("Invalid JSON"));
      }
    });
  });
}

function getCookie(req, name) {
  const cookies = String(req.headers.cookie || "").split(";").map((part) => part.trim());
  const found = cookies.find((part) => part.startsWith(`${name}=`));
  return found ? decodeURIComponent(found.slice(name.length + 1)) : "";
}

function isAuthenticated(req) {
  const token = getCookie(req, "pos_session");
  const session = sessions.get(token);
  if (!session) return false;
  if (Date.now() - session.createdAt > sessionMaxAgeMs) {
    sessions.delete(token);
    return false;
  }
  return true;
}

function ensureDataFile() {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
  } catch (error) {
    dataDir = path.join(os.tmpdir(), "pos-project-data");
    dbPath = path.join(dataDir, "pos-db.json");
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(defaultDb, null, 2));
  }
}

function readDb() {
  ensureDataFile();
  const saved = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  if (saved.menuVersion !== defaultDb.menuVersion) {
    const migratedSettings = { ...defaultDb.settings, ...saved.settings };
    if (!saved.settings || saved.settings.storeName === "Tender House") {
      migratedSettings.storeName = defaultDb.settings.storeName;
    }
    return {
      ...defaultDb,
      settings: migratedSettings,
      nextOrderNumber: Number(saved.nextOrderNumber) || defaultDb.nextOrderNumber,
      orders: Array.isArray(saved.orders) ? saved.orders : []
    };
  }
  return {
    ...defaultDb,
    ...saved,
    settings: { ...defaultDb.settings, ...saved.settings },
    items: Array.isArray(saved.items) ? saved.items : defaultDb.items,
    orders: Array.isArray(saved.orders) ? saved.orders : []
  };
}

function writeDb(db) {
  ensureDataFile();
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

async function handleApi(req, res, url) {
  if (req.method === "POST" && url.pathname === "/api/login") {
    const body = await readBody(req);
    if (String(body.pin || "") !== posPin) {
      sendJson(res, 401, { ok: false, message: "Wrong PIN" });
      return;
    }
    const token = crypto.randomBytes(24).toString("hex");
    sessions.set(token, { createdAt: Date.now() });
    res.writeHead(200, {
      "content-type": "application/json; charset=utf-8",
      "set-cookie": `pos_session=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${Math.floor(sessionMaxAgeMs / 1000)}`
    });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/logout") {
    sessions.delete(getCookie(req, "pos_session"));
    res.writeHead(200, {
      "content-type": "application/json; charset=utf-8",
      "set-cookie": "pos_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0"
    });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (!isAuthenticated(req)) {
    sendJson(res, 401, { ok: false, message: "Login required" });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/state") {
    sendJson(res, 200, { ok: true, state: readDb() });
    return;
  }

  if (req.method === "PUT" && url.pathname === "/api/state") {
    const body = await readBody(req);
    writeDb({
      menuVersion: body.menuVersion || defaultDb.menuVersion,
      settings: body.settings || defaultDb.settings,
      nextOrderNumber: Number(body.nextOrderNumber) || 1001,
      items: Array.isArray(body.items) ? body.items : [],
      orders: Array.isArray(body.orders) ? body.orders : []
    });
    sendJson(res, 200, { ok: true });
    return;
  }

  sendJson(res, 404, { ok: false, message: "Not found" });
}

function getLocalAddresses() {
  return Object.values(os.networkInterfaces())
    .flat()
    .filter((item) => item && item.family === "IPv4" && !item.internal)
    .map((item) => item.address);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname.startsWith("/api/")) {
    handleApi(req, res, url).catch((error) => sendJson(res, 400, { ok: false, message: error.message }));
    return;
  }

  const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const requested = path.normalize(path.join(root, pathname));

  if (!requested.startsWith(root)) {
    send(res, 403, "Forbidden");
    return;
  }

  fs.readFile(requested, (error, data) => {
    if (error) {
      send(res, 404, "Not found");
      return;
    }
    send(res, 200, data, types[path.extname(requested).toLowerCase()] || "application/octet-stream");
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`POS Project is running at http://localhost:${port}`);
  console.log(`PIN: ${posPin}`);
  getLocalAddresses().forEach((address) => {
    console.log(`Same Wi-Fi device: http://${address}:${port}`);
  });
});
