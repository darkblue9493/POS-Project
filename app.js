(function () {
  const storageKey = "customStorePos.v1";
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  const remoteMode = location.protocol !== "file:";

  const defaultState = {
    menuVersion: "thomaston-raceway-2026-06-27",
    stores: [
      { id: "thomaston-raceway", name: "Thomaston Raceway", address: "" },
    ],
    registers: [
      { id: "main-register", name: "Main Register", storeId: "thomaston-raceway" },
    ],
    settings: {
      storeName: "Thomaston Raceway",
      taxRate: 8.25,
      receiptFooter: "Thank you for your order",
    },
    nextOrderNumber: 1001,
    activeCategory: "All",
    selectedStoreId: "thomaston-raceway",
    selectedRegisterId: "main-register",
    orderType: "dine-in",
    payment: "Cash",
    cart: [],
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
      { id: "egg-roll", name: "Egg Roll", category: "Misc", price: 2.19, tender: false },
    ],
  };

  const elements = {
    storeName: document.getElementById("storeName"),
    modeLabel: document.getElementById("modeLabel"),
    storeSelect: document.getElementById("storeSelect"),
    todaySales: document.getElementById("todaySales"),
    todayOrders: document.getElementById("todayOrders"),
    averageTicket: document.getElementById("averageTicket"),
    paymentMix: document.getElementById("paymentMix"),
    recentOrders: document.getElementById("recentOrders"),
    loginScreen: document.getElementById("loginScreen"),
    loginForm: document.getElementById("loginForm"),
    pinInput: document.getElementById("pinInput"),
    loginMessage: document.getElementById("loginMessage"),
    tabs: Array.from(document.querySelectorAll(".tab-button")),
    views: Array.from(document.querySelectorAll(".view")),
    orderTypeButtons: Array.from(document.querySelectorAll("[data-order-type]")),
    paymentButtons: Array.from(document.querySelectorAll("[data-payment]")),
    categoryStrip: document.getElementById("categoryStrip"),
    menuGrid: document.getElementById("menuGrid"),
    itemSearch: document.getElementById("itemSearch"),
    barcodeScanInput: document.getElementById("barcodeScanInput"),
    ticketNumber: document.getElementById("ticketNumber"),
    customerName: document.getElementById("customerName"),
    ticketNote: document.getElementById("ticketNote"),
    orderSource: document.getElementById("orderSource"),
    cartItems: document.getElementById("cartItems"),
    bogoToggle: document.getElementById("bogoToggle"),
    subtotal: document.getElementById("subtotal"),
    discount: document.getElementById("discount"),
    tax: document.getElementById("tax"),
    total: document.getElementById("total"),
    checkoutButton: document.getElementById("checkoutButton"),
    clearCartButton: document.getElementById("clearCartButton"),
    ordersTableBody: document.getElementById("ordersTableBody"),
    exportOrdersButton: document.getElementById("exportOrdersButton"),
    itemForm: document.getElementById("itemForm"),
    itemNameInput: document.getElementById("itemNameInput"),
    itemCategoryInput: document.getElementById("itemCategoryInput"),
    itemPriceInput: document.getElementById("itemPriceInput"),
    itemBarcodeInput: document.getElementById("itemBarcodeInput"),
    itemTenderInput: document.getElementById("itemTenderInput"),
    itemList: document.getElementById("itemList"),
    settingsForm: document.getElementById("settingsForm"),
    storeForm: document.getElementById("storeForm"),
    newStoreNameInput: document.getElementById("newStoreNameInput"),
    newStoreAddressInput: document.getElementById("newStoreAddressInput"),
    registerForm: document.getElementById("registerForm"),
    newRegisterNameInput: document.getElementById("newRegisterNameInput"),
    newRegisterStoreSelect: document.getElementById("newRegisterStoreSelect"),
    registerList: document.getElementById("registerList"),
    settingsStoreName: document.getElementById("settingsStoreName"),
    settingsTaxRate: document.getElementById("settingsTaxRate"),
    settingsReceiptFooter: document.getElementById("settingsReceiptFooter"),
    receiptDialog: document.getElementById("receiptDialog"),
    receiptContent: document.getElementById("receiptContent"),
    printReceiptButton: document.getElementById("printReceiptButton"),
    closeReceiptButton: document.getElementById("closeReceiptButton"),
  };

  let state = loadState();
  let hydrated = !remoteMode;
  let saveTimer = null;
  const appMode = getAppMode();

  function getAppMode() {
    const mode = new URLSearchParams(location.search).get("mode");
    if (mode === "back-office" || location.pathname.includes("back-office")) return "back-office";
    return "register";
  }

  function getRequestedRegisterId() {
    return new URLSearchParams(location.search).get("register") || "";
  }

  function getAllowedViews() {
    return appMode === "back-office" ? ["dashboard", "orders", "items", "settings"] : ["register", "orders"];
  }

  function applyAppMode() {
    document.body.dataset.appMode = appMode;
    elements.tabs.forEach((tab) => {
      const modes = String(tab.dataset.modes || "").split(/\s+/);
      tab.hidden = !modes.includes(appMode);
    });
  }

  function setLoginVisible(visible) {
    elements.loginScreen.hidden = !visible;
    elements.loginScreen.classList.toggle("is-unlocked", !visible);
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (!saved || saved.menuVersion !== defaultState.menuVersion) return structuredClone(defaultState);
      const merged = saved ? { ...defaultState, ...saved, settings: { ...defaultState.settings, ...saved.settings } } : structuredClone(defaultState);
      merged.stores = Array.isArray(merged.stores) && merged.stores.length ? merged.stores : defaultState.stores;
      merged.registers = Array.isArray(merged.registers) && merged.registers.length ? merged.registers : defaultState.registers;
      merged.selectedStoreId = merged.selectedStoreId || merged.stores[0].id;
      merged.selectedRegisterId = merged.selectedRegisterId || merged.registers[0].id;
      merged.items = merged.items.map((item) => ({ ...item, storeId: item.storeId || merged.stores[0].id, barcode: item.barcode || item.sku || item.id }));
      return merged;
    } catch (error) {
      return structuredClone(defaultState);
    }
  }

  function saveState() {
    if (!hydrated) return;
    localStorage.setItem(storageKey, JSON.stringify(state));
    if (remoteMode) {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(saveRemoteState, 250);
    }
  }

  async function api(path, options = {}) {
    const response = await fetch(path, {
      credentials: "same-origin",
      headers: { "content-type": "application/json", ...(options.headers || {}) },
      ...options,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Request failed");
    return data;
  }

  async function loadRemoteState() {
    if (!remoteMode) return;
    try {
      const data = await api("/api/state");
      state = {
        ...state,
        ...data.state,
        activeCategory: "All",
        orderType: state.orderType,
        payment: state.payment,
        cart: [],
      };
      hydrated = true;
      setLoginVisible(false);
      render();
      setView(getAllowedViews()[0]);
    } catch (error) {
      setLoginVisible(true);
      elements.loginMessage.textContent = error.message === "Login required" ? "" : error.message;
    }
  }

  async function saveRemoteState() {
    if (!remoteMode || !hydrated) return;
    try {
      await api("/api/state", {
        method: "PUT",
        body: JSON.stringify({
          settings: state.settings,
          menuVersion: state.menuVersion,
          stores: state.stores,
          registers: state.registers,
          nextOrderNumber: state.nextOrderNumber,
          items: state.items,
          orders: state.orders,
        }),
      });
    } catch (error) {
      elements.modeLabel.textContent = "Offline changes";
    }
  }

  function uid(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  }

  function price(value) {
    return money.format(Number(value) || 0);
  }

  function getCategories() {
    return ["All", ...Array.from(new Set(state.items.filter((item) => item.storeId === state.selectedStoreId).map((item) => item.category)))];
  }

  function getCartTotals() {
    const subtotal = state.cart.reduce((sum, line) => sum + line.price * line.qty, 0);
    const discount = elements.bogoToggle.checked ? getBogoDiscount() : 0;
    const taxable = Math.max(0, subtotal - discount);
    const tax = taxable * ((Number(state.settings.taxRate) || 0) / 100);
    return { subtotal, discount, tax, total: taxable + tax };
  }

  function getBogoDiscount() {
    const tenderUnits = [];
    state.cart.forEach((line) => {
      if (!line.tender) return;
      for (let i = 0; i < line.qty; i += 1) tenderUnits.push(line.price);
    });
    tenderUnits.sort((a, b) => a - b);
    const freeCount = Math.floor(tenderUnits.length / 2);
    return tenderUnits.slice(0, freeCount).reduce((sum, amount) => sum + amount, 0);
  }

  function setView(viewName) {
    const allowed = getAllowedViews();
    const targetView = allowed.includes(viewName) ? viewName : allowed[0];
    elements.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.view === targetView));
    elements.views.forEach((view) => view.classList.toggle("active", view.id === `${targetView}View`));
    render();
  }

  function render() {
    ensureSelectedStore();
    elements.storeName.textContent = state.settings.storeName;
    elements.modeLabel.textContent = remoteMode ? "Shared mode" : "Local mode";
    elements.ticketNumber.textContent = `Order #${state.nextOrderNumber}`;
    elements.settingsStoreName.value = state.settings.storeName;
    elements.settingsTaxRate.value = state.settings.taxRate;
    elements.settingsReceiptFooter.value = state.settings.receiptFooter;
    renderCategories();
    renderStoreSelect();
    renderRegisterControls();
    renderMenu();
    renderCart();
    renderOrders();
    renderItems();
    renderDashboard();
    saveState();
  }

  function ensureSelectedStore() {
    if (!Array.isArray(state.stores) || !state.stores.length) {
      state.stores = structuredClone(defaultState.stores);
    }
    if (!Array.isArray(state.registers) || !state.registers.length) {
      state.registers = structuredClone(defaultState.registers);
    }
    if (!state.selectedStoreId || !state.stores.some((store) => store.id === state.selectedStoreId)) {
      state.selectedStoreId = state.stores[0].id;
    }
    const requestedRegisterId = getRequestedRegisterId();
    const requestedRegister = state.registers.find((register) => register.id === requestedRegisterId);
    if (requestedRegister && appMode === "register") {
      state.selectedRegisterId = requestedRegister.id;
      state.selectedStoreId = requestedRegister.storeId;
    }
    if (!state.selectedRegisterId || !state.registers.some((register) => register.id === state.selectedRegisterId)) {
      state.selectedRegisterId = state.registers[0].id;
    }
    state.items = state.items.map((item) => ({ ...item, storeId: item.storeId || state.stores[0].id }));
  }

  function getSelectedStore() {
    ensureSelectedStore();
    return state.stores.find((store) => store.id === state.selectedStoreId) || state.stores[0];
  }

  function getSelectedRegister() {
    ensureSelectedStore();
    return state.registers.find((register) => register.id === state.selectedRegisterId) || state.registers[0];
  }

  function renderStoreSelect() {
    elements.storeSelect.innerHTML = "";
    state.stores.forEach((store) => {
      const option = document.createElement("option");
      option.value = store.id;
      option.textContent = store.name;
      option.selected = store.id === state.selectedStoreId;
      elements.storeSelect.appendChild(option);
    });
  }

  function renderRegisterControls() {
    elements.newRegisterStoreSelect.innerHTML = "";
    state.stores.forEach((store) => {
      const option = document.createElement("option");
      option.value = store.id;
      option.textContent = store.name;
      option.selected = store.id === state.selectedStoreId;
      elements.newRegisterStoreSelect.appendChild(option);
    });

    elements.registerList.innerHTML = "";
    state.registers.forEach((register) => {
      const store = state.stores.find((candidate) => candidate.id === register.storeId);
      const url = `register.html?register=${encodeURIComponent(register.id)}`;
      const row = document.createElement("div");
      row.className = "item-list-row";
      row.innerHTML = `
        <div>
          <strong>${escapeHtml(register.name)}</strong>
          <div class="line-meta">${escapeHtml(store ? store.name : "No store assigned")}</div>
        </div>
        <span>${escapeHtml(register.id)}</span>
        <a class="secondary-button link-button" href="${url}">Open</a>
        <button class="secondary-button" type="button">Remove</button>
      `;
      row.querySelector("button").addEventListener("click", () => {
        state.registers = state.registers.filter((candidate) => candidate.id !== register.id);
        if (!state.registers.length) {
          state.registers = structuredClone(defaultState.registers);
        }
        render();
      });
      elements.registerList.appendChild(row);
    });
  }

  function getTodaysOrders() {
    const today = new Date().toDateString();
    return state.orders.filter((order) => new Date(order.createdAt).toDateString() === today && (order.storeId || state.selectedStoreId) === state.selectedStoreId);
  }

  function renderDashboard() {
    const orders = getTodaysOrders();
    const total = orders.reduce((sum, order) => sum + Number(order.totals.total || 0), 0);
    const paymentCounts = orders.reduce(
      (counts, order) => {
        counts[order.payment] = (counts[order.payment] || 0) + 1;
        return counts;
      },
      { Cash: 0, Card: 0, Online: 0 }
    );

    elements.todaySales.textContent = price(total);
    elements.todayOrders.textContent = String(orders.length);
    elements.averageTicket.textContent = price(orders.length ? total / orders.length : 0);
    elements.paymentMix.textContent = `${paymentCounts.Cash || 0} / ${paymentCounts.Card || 0} / ${paymentCounts.Online || 0}`;
    elements.recentOrders.innerHTML = "";

    if (!state.orders.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "No orders yet";
      elements.recentOrders.appendChild(empty);
      return;
    }

    state.orders.slice(0, 5).forEach((order) => {
      const row = document.createElement("button");
      row.className = "recent-order";
      row.type = "button";
      row.innerHTML = `
        <strong>#${order.id} ${escapeHtml(order.customer)} - ${price(order.totals.total)}</strong>
        <span>${escapeHtml(order.source || "In Store")} / ${escapeHtml(order.payment)} / ${new Date(order.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
      `;
      row.addEventListener("click", () => showReceipt(order));
      elements.recentOrders.appendChild(row);
    });
  }

  function renderCategories() {
    elements.categoryStrip.innerHTML = "";
    getCategories().forEach((category) => {
      const button = document.createElement("button");
      button.className = `category-button${state.activeCategory === category ? " active" : ""}`;
      button.type = "button";
      button.textContent = category;
      button.addEventListener("click", () => {
        state.activeCategory = category;
        render();
      });
      elements.categoryStrip.appendChild(button);
    });
  }

  function renderMenu() {
    const query = elements.itemSearch.value.trim().toLowerCase();
    const filtered = state.items.filter((item) => {
      if (item.storeId !== state.selectedStoreId) return false;
      const matchesCategory = state.activeCategory === "All" || item.category === state.activeCategory;
      const matchesSearch = !query || item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });

    elements.menuGrid.innerHTML = "";
    filtered.forEach((item) => {
      const button = document.createElement("button");
      button.className = "menu-item";
      button.type = "button";
      button.innerHTML = `
          <div class="item-chip ${categoryChipClass(item.category)}">${item.name.slice(0, 2).toUpperCase()}</div>
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <span>${escapeHtml(item.category)}</span>
        </div>
        <strong>${price(item.price)}</strong>
      `;
      button.addEventListener("click", () => addToCart(item));
      elements.menuGrid.appendChild(button);
    });
  }

  function addToCart(item) {
    const existing = state.cart.find((line) => line.id === item.id);
    if (existing) {
      existing.qty += 1;
    } else {
      state.cart.push({ ...item, qty: 1 });
    }
    renderCart();
    saveState();
  }

  function normalizeBarcode(value) {
    return String(value || "").trim().toLowerCase();
  }

  function scanBarcode(value) {
    const code = normalizeBarcode(value);
    if (!code) return;
    const item = state.items.find((candidate) =>
      candidate.storeId === state.selectedStoreId &&
      [candidate.barcode, candidate.sku, candidate.id].some((candidateCode) => normalizeBarcode(candidateCode) === code)
    );
    if (!item) {
      elements.barcodeScanInput.value = "";
      elements.barcodeScanInput.placeholder = "Not found";
      setTimeout(() => {
        elements.barcodeScanInput.placeholder = "Scan barcode";
      }, 1400);
      return;
    }
    addToCart(item);
    elements.barcodeScanInput.value = "";
    elements.barcodeScanInput.placeholder = `Added ${item.name}`;
    setTimeout(() => {
      elements.barcodeScanInput.placeholder = "Scan barcode";
    }, 1400);
  }

  function renderCart() {
    elements.cartItems.innerHTML = "";

    if (state.cart.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "No items added";
      elements.cartItems.appendChild(empty);
    } else {
      state.cart.forEach((line) => {
        const row = document.createElement("div");
        row.className = "line-row";
        row.innerHTML = `
          <div>
            <div class="line-name">${escapeHtml(line.name)}</div>
            <div class="line-meta">${price(line.price)} each</div>
          </div>
          <div class="qty-controls">
            <button type="button" data-action="decrease" aria-label="Decrease">-</button>
            <strong>${line.qty}</strong>
            <button type="button" data-action="increase" aria-label="Increase">+</button>
          </div>
        `;
        row.querySelector('[data-action="decrease"]').addEventListener("click", () => changeQty(line.id, -1));
        row.querySelector('[data-action="increase"]').addEventListener("click", () => changeQty(line.id, 1));
        elements.cartItems.appendChild(row);
      });
    }

    const totals = getCartTotals();
    elements.subtotal.textContent = price(totals.subtotal);
    elements.discount.textContent = `-${price(totals.discount)}`;
    elements.tax.textContent = price(totals.tax);
    elements.total.textContent = price(totals.total);
    elements.checkoutButton.disabled = state.cart.length === 0;
  }

  function changeQty(id, delta) {
    const line = state.cart.find((item) => item.id === id);
    if (!line) return;
    line.qty += delta;
    state.cart = state.cart.filter((item) => item.qty > 0);
    renderCart();
    saveState();
  }

  function completeOrder() {
    if (!state.cart.length) return;
    const totals = getCartTotals();
    const order = {
      id: state.nextOrderNumber,
      customer: elements.customerName.value.trim() || "Walk-in",
      storeId: state.selectedStoreId,
      storeName: getSelectedStore().name,
      registerId: state.selectedRegisterId,
      registerName: getSelectedRegister().name,
      orderType: state.orderType,
      source: elements.orderSource.value,
      note: elements.ticketNote.value.trim(),
      payment: state.payment,
      promo: elements.bogoToggle.checked ? "BOGO tenders" : "",
      items: state.cart.map((line) => ({ ...line })),
      totals,
      createdAt: new Date().toISOString(),
    };
    state.orders.unshift(order);
    state.nextOrderNumber += 1;
    state.cart = [];
    elements.customerName.value = "";
    elements.ticketNote.value = "";
    showReceipt(order);
    render();
  }

  function showReceipt(order) {
    elements.receiptContent.innerHTML = `
      <h3>${escapeHtml(state.settings.storeName)}</h3>
      <p>Order #${order.id}<br>${new Date(order.createdAt).toLocaleString()}<br>${escapeHtml(order.customer)}<br>${escapeHtml(order.storeName || getSelectedStore().name)} / ${escapeHtml(order.registerName || getSelectedRegister().name)}<br>${escapeHtml(order.source || "In Store")}</p>
      ${order.note ? `<p>Note: ${escapeHtml(order.note)}</p>` : ""}
      ${order.items
        .map(
          (item) => `
            <div class="receipt-line">
              <span>${item.qty} x ${escapeHtml(item.name)}</span>
              <strong>${price(item.qty * item.price)}</strong>
            </div>
          `
        )
        .join("")}
      ${order.promo ? `<p>${escapeHtml(order.promo)}</p>` : ""}
      <hr>
      <div class="receipt-line"><span>Subtotal</span><strong>${price(order.totals.subtotal)}</strong></div>
      <div class="receipt-line"><span>Discount</span><strong>-${price(order.totals.discount)}</strong></div>
      <div class="receipt-line"><span>Tax</span><strong>${price(order.totals.tax)}</strong></div>
      <div class="receipt-line"><span>Total</span><strong>${price(order.totals.total)}</strong></div>
      <p>${escapeHtml(state.settings.receiptFooter)}</p>
    `;
    elements.receiptDialog.showModal();
  }

  function renderOrders() {
    elements.ordersTableBody.innerHTML = "";
    if (!state.orders.length) {
      const row = document.createElement("tr");
      row.innerHTML = '<td colspan="7">No orders yet</td>';
      elements.ordersTableBody.appendChild(row);
      return;
    }
    state.orders.forEach((order) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>#${order.id}</td>
        <td>${escapeHtml(order.customer)}</td>
        <td>${escapeHtml(order.orderType)}</td>
        <td>${escapeHtml(order.payment)}</td>
        <td>${escapeHtml(order.source || "In Store")}</td>
        <td>${price(order.totals.total)}</td>
        <td>${new Date(order.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</td>
      `;
      row.addEventListener("click", () => showReceipt(order));
      elements.ordersTableBody.appendChild(row);
    });
  }

  function renderItems() {
    elements.itemList.innerHTML = "";
    state.items.filter((item) => item.storeId === state.selectedStoreId).forEach((item) => {
      const row = document.createElement("div");
      row.className = "item-list-row";
      row.innerHTML = `
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <div class="line-meta">${escapeHtml(item.category)}${item.tender ? " / Tender promo item" : ""}</div>
        </div>
        <span>${escapeHtml(item.barcode || "No barcode")}</span>
        <strong>${price(item.price)}</strong>
        <button class="secondary-button" type="button">Remove</button>
      `;
      row.querySelector("button").addEventListener("click", () => {
        state.items = state.items.filter((candidate) => candidate.id !== item.id);
        state.cart = state.cart.filter((candidate) => candidate.id !== item.id);
        render();
      });
      elements.itemList.appendChild(row);
    });
  }

  function exportOrders() {
    const header = ["order", "customer", "type", "source", "payment", "subtotal", "discount", "tax", "total", "note", "created_at"];
    const rows = state.orders.map((order) => [
      order.id,
      order.customer,
      order.orderType,
      order.source || "In Store",
      order.payment,
      order.totals.subtotal.toFixed(2),
      order.totals.discount.toFixed(2),
      order.totals.tax.toFixed(2),
      order.totals.total.toFixed(2),
      order.note || "",
      order.createdAt,
    ]);
    const csv = [header, ...rows].map((row) => row.map(csvValue).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "pos-orders.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function csvValue(value) {
    return `"${String(value).replaceAll('"', '""')}"`;
  }

  function categoryChipClass(category) {
    const normalized = String(category).toLowerCase();
    if (normalized.includes("tender")) return "chip-tenders";
    if (normalized.includes("box") || normalized.includes("meal")) return "chip-combos";
    if (normalized.includes("side") || normalized.includes("biscuit")) return "chip-sides";
    if (normalized.includes("wing") || normalized.includes("chicken")) return "chip-drinks";
    return "chip-desserts";
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  elements.tabs.forEach((tab) => tab.addEventListener("click", () => setView(tab.dataset.view)));
  elements.storeSelect.addEventListener("change", () => {
    state.selectedStoreId = elements.storeSelect.value;
    state.activeCategory = "All";
    state.cart = [];
    render();
  });
  document.querySelectorAll("[data-jump-register]").forEach((button) => button.addEventListener("click", () => setView("register")));
  document.querySelectorAll("[data-jump-items]").forEach((button) => button.addEventListener("click", () => setView("items")));
  document.querySelectorAll("[data-jump-orders]").forEach((button) => button.addEventListener("click", () => setView("orders")));
  elements.orderTypeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.orderType = button.dataset.orderType;
      elements.orderTypeButtons.forEach((candidate) => candidate.classList.toggle("active", candidate === button));
      saveState();
    });
  });
  elements.paymentButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.payment = button.dataset.payment;
      elements.paymentButtons.forEach((candidate) => candidate.classList.toggle("active", candidate === button));
      saveState();
    });
  });
  elements.itemSearch.addEventListener("input", renderMenu);
  elements.barcodeScanInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      scanBarcode(elements.barcodeScanInput.value);
    }
  });
  elements.bogoToggle.addEventListener("change", renderCart);
  elements.checkoutButton.addEventListener("click", completeOrder);
  elements.clearCartButton.addEventListener("click", () => {
    state.cart = [];
    renderCart();
    saveState();
  });
  elements.exportOrdersButton.addEventListener("click", exportOrders);
  elements.printReceiptButton.addEventListener("click", () => window.print());
  elements.closeReceiptButton.addEventListener("click", () => elements.receiptDialog.close());
  elements.loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    elements.loginMessage.textContent = "Checking...";
    try {
      await api("/api/login", {
        method: "POST",
        body: JSON.stringify({ pin: elements.pinInput.value, mode: appMode }),
      });
      elements.pinInput.value = "";
      await loadRemoteState();
    } catch (error) {
      elements.loginMessage.textContent = error.message;
    }
  });

  elements.itemForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.items.push({
      id: uid("item"),
      name: elements.itemNameInput.value.trim(),
      category: elements.itemCategoryInput.value.trim(),
      price: Number(elements.itemPriceInput.value),
      storeId: state.selectedStoreId,
      barcode: elements.itemBarcodeInput.value.trim(),
      tender: elements.itemTenderInput.checked,
    });
    elements.itemForm.reset();
    render();
  });

  elements.settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.settings.storeName = elements.settingsStoreName.value.trim() || defaultState.settings.storeName;
    state.settings.taxRate = Number(elements.settingsTaxRate.value) || 0;
    state.settings.receiptFooter = elements.settingsReceiptFooter.value.trim();
    render();
  });

  elements.storeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = elements.newStoreNameInput.value.trim();
    if (!name) return;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || uid("store");
    const id = state.stores.some((store) => store.id === slug) ? `${slug}-${Date.now().toString(36)}` : slug;
    state.stores.push({ id, name, address: elements.newStoreAddressInput.value.trim() });
    state.selectedStoreId = id;
    state.activeCategory = "All";
    state.cart = [];
    elements.storeForm.reset();
    render();
  });

  elements.registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = elements.newRegisterNameInput.value.trim();
    const storeId = elements.newRegisterStoreSelect.value;
    if (!name || !storeId) return;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || uid("register");
    const id = state.registers.some((register) => register.id === slug) ? `${slug}-${Date.now().toString(36)}` : slug;
    state.registers.push({ id, name, storeId });
    state.selectedRegisterId = id;
    state.selectedStoreId = storeId;
    elements.registerForm.reset();
    render();
  });

  elements.orderTypeButtons.forEach((button) => button.classList.toggle("active", button.dataset.orderType === state.orderType));
  elements.paymentButtons.forEach((button) => button.classList.toggle("active", button.dataset.payment === state.payment));
  applyAppMode();
  if (remoteMode) {
    setLoginVisible(true);
    loadRemoteState();
  } else {
    render();
    setView(getAllowedViews()[0]);
  }
})();
