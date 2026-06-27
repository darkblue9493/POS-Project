const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");

const root = __dirname;
const dataDir = process.env.DATA_DIR || path.join(root, "data");
const dbPath = path.join(dataDir, "pos-db.json");
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
  settings: {
    storeName: "Tender House",
    taxRate: 8.25,
    receiptFooter: "Thank you for your order",
  },
  nextOrderNumber: 1001,
  orders: [],
  items: [
    { id: "tender-3", name: "3 Piece Tenders", category: "Tenders", price: 7.99, tender: true },
    { id: "tender-5", name: "5 Piece Tenders", category: "Tenders", price: 10.99, tender: true },
    { id: "tender-8", name: "8 Piece Tenders", category: "Tenders", price: 15.99, tender: true },
    { id: "combo-classic", name: "Tender Combo", category: "Combos", price: 12.99, tender: false },
    { id: "combo-family", name: "Family Tender Box", category: "Combos", price: 29.99, tender: false },
    { id: "side-fries", name: "Seasoned Fries", category: "Sides", price: 3.99, tender: false },
    { id: "side-slaw", name: "Coleslaw", category: "Sides", price: 2.99, tender: false },
    { id: "drink-soda", name: "Fountain Drink", category: "Drinks", price: 2.49, tender: false },
    { id: "dessert-cookie", name: "Cookie", category: "Desserts", price: 1.99, tender: false }
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
  fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(defaultDb, null, 2));
  }
}

function readDb() {
  ensureDataFile();
  const saved = JSON.parse(fs.readFileSync(dbPath, "utf8"));
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
