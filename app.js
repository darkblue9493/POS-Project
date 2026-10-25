(function () {
  const storageKey = "customStorePos.v1";
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  const remoteMode = location.protocol !== "file:";

  const defaultState = {
    menuVersion: "thomaston-raceway-2026-06-27",
    stores: [
      { id: "thomaston-raceway", name: "Thomaston Raceway", address: "", pin: "1234" },
    ],
    registers: [
      { id: "main-register", name: "Main Register", storeId: "thomaston-raceway" },
    ],
    promotions: [],
    users: [],
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
    registerStoreName: document.getElementById("registerStoreName"),
    modeLabel: document.getElementById("modeLabel"),
    storeSelect: document.getElementById("storeSelect"),
    todaySales: document.getElementById("todaySales"),
    todayOrders: document.getElementById("todayOrders"),
    averageTicket: document.getElementById("averageTicket"),
    paymentMix: document.getElementById("paymentMix"),
    inventoryCount: document.getElementById("inventoryCount"),
    activePromoCount: document.getElementById("activePromoCount"),
    recentOrders: document.getElementById("recentOrders"),
    reportRange: document.getElementById("reportRange"),
    reportCaption: document.getElementById("reportCaption"),
    reportGrossSales: document.getElementById("reportGrossSales"),
    reportDiscounts: document.getElementById("reportDiscounts"),
    reportTax: document.getElementById("reportTax"),
    reportTicketCount: document.getElementById("reportTicketCount"),
    reportAverageTicket: document.getElementById("reportAverageTicket"),
    reportItemsSold: document.getElementById("reportItemsSold"),
    paymentReport: document.getElementById("paymentReport"),
    bestSellerReport: document.getElementById("bestSellerReport"),
    lowStockReport: document.getElementById("lowStockReport"),
    exportReportButton: document.getElementById("exportReportButton"),
    loginScreen: document.getElementById("loginScreen"),
    loginForm: document.getElementById("loginForm"),
    pinInput: document.getElementById("pinInput"),
    loginMessage: document.getElementById("loginMessage"),
    loginEyebrow: document.getElementById("loginEyebrow"),
    loginTitle: document.getElementById("loginTitle"),
    loginHelp: document.getElementById("loginHelp"),
    loginSubmitButton: document.getElementById("loginSubmitButton"),
    registerLoginButton: document.getElementById("registerLoginButton"),
    managerLoginButton: document.getElementById("managerLoginButton"),
    logoutButton: document.getElementById("logoutButton"),
    managerLogoutButton: document.getElementById("managerLogoutButton"),
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
    itemCostInput: document.getElementById("itemCostInput"),
    itemStockInput: document.getElementById("itemStockInput"),
    itemBarcodeInput: document.getElementById("itemBarcodeInput"),
    itemTenderInput: document.getElementById("itemTenderInput"),
    itemList: document.getElementById("itemList"),
    settingsForm: document.getElementById("settingsForm"),
    storeForm: document.getElementById("storeForm"),
    newStoreNameInput: document.getElementById("newStoreNameInput"),
    newStoreAddressInput: document.getElementById("newStoreAddressInput"),
    newStorePinInput: document.getElementById("newStorePinInput"),
    storeList: document.getElementById("storeList"),
    registerForm: document.getElementById("registerForm"),
    newRegisterNameInput: document.getElementById("newRegisterNameInput"),
    newRegisterStoreSelect: document.getElementById("newRegisterStoreSelect"),
    registerList: document.getElementById("registerList"),
    settingsStoreName: document.getElementById("settingsStoreName"),
    settingsTaxRate: document.getElementById("settingsTaxRate"),
    settingsReceiptFooter: document.getElementById("settingsReceiptFooter"),
    settingsReceiptHeader: document.getElementById("settingsReceiptHeader"),
    userForm: document.getElementById("userForm"),
    newUserNameInput: document.getElementById("newUserNameInput"),
    newUserPinInput: document.getElementById("newUserPinInput"),
    newUserStoreSelect: document.getElementById("newUserStoreSelect"),
    userList: document.getElementById("userList"),
    receiptDialog: document.getElementById("receiptDialog"),
    receiptContent: document.getElementById("receiptContent"),
    printReceiptButton: document.getElementById("printReceiptButton"),
    closeReceiptButton: document.getElementById("closeReceiptButton"),
    promotionForm: document.getElementById("promotionForm"),
    promoNameInput: document.getElementById("promoNameInput"),
    promoItemSelect: document.getElementById("promoItemSelect"),
    promoBuyQtyInput: document.getElementById("promoBuyQtyInput"),
    promoDiscountInput: document.getElementById("promoDiscountInput"),
    promoActiveInput: document.getElementById("promoActiveInput"),
    promotionList: document.getElementById("promotionList"),
  };

  let state = loadState();
  let hydrated = !remoteMode;
  let saveTimer = null;
  const appMode = getAppMode();
  let loginRole = appMode;

  function getAppMode() {
    const mode = new URLSearchParams(location.search).get("mode");
    if (mode === "back-office" || location.pathname.includes("back-office")) return "back-office";
    return "register";
  }

  function getRequestedRegisterId() {
    return new URLSearchParams(location.search).get("register") || "";
  }

  function getRequestedStoreId() {
    return new URLSearchParams(location.search).get("store") || "";
  }

  function getAllowedViews() {
    return appMode === "back-office" ? ["dashboard", "reports", "orders", "items", "promotions", "settings"] : ["register", "orders"];
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

  function setLoginRole(role) {
    loginRole = role === "back-office" ? "back-office" : "register";
    const manager = loginRole === "back-office";
    elements.registerLoginButton.classList.toggle("active", !manager);
    elements.managerLoginButton.classList.toggle("active", manager);
    elements.loginEyebrow.textContent = manager ? "Manager access" : "Register access";
    elements.loginTitle.textContent = manager ? "Vedrix Manager" : "Vedrix POS";
    elements.loginHelp.textContent = manager ? "Enter the manager PIN to open the Vedrix manager workspace." : "Enter the register PIN. Vedrix POS will open the matching store.";
    elements.loginSubmitButton.textContent = manager ? "Open manager" : "Open register";
    elements.pinInput.value = "";
    elements.loginMessage.textContent = "";
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (!saved || saved.menuVersion !== defaultState.menuVersion) return structuredClone(defaultState);
      const merged = saved ? { ...defaultState, ...saved, settings: { ...defaultState.settings, ...saved.settings } } : structuredClone(defaultState);
      merged.stores = Array.isArray(merged.stores) && merged.stores.length ? merged.stores : defaultState.stores;
      merged.stores = merged.stores.map((store) => ({ ...store, pin: String(store.pin || "1234") }));
      merged.registers = Array.isArray(merged.registers) && merged.registers.length ? merged.registers : defaultState.registers;
      merged.promotions = Array.isArray(merged.promotions) ? merged.promotions : [];
      merged.users = Array.isArray(merged.users) ? merged.users : [];
      merged.selectedStoreId = merged.selectedStoreId || merged.stores[0].id;
      merged.selectedRegisterId = merged.selectedRegisterId || merged.registers[0].id;
      merged.items = merged.items.map((item) => ({ ...item, storeId: item.storeId || merged.stores[0].id, stock: Number(item.stock) || 0, cost: Number(item.cost) || 0, barcode: item.barcode || item.sku || item.id }));
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

  async function loadRemoteState(preferredStoreId = "") {
    if (!remoteMode) return;
    try {
      const data = await api("/api/state");
      state = {
        ...state,
        ...data.state,
        activeCategory: "All",
        selectedStoreId: preferredStoreId || getRequestedStoreId() || state.selectedStoreId,
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
          promotions: state.promotions,
          users: state.users,
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
    const discount = (elements.bogoToggle.checked ? getBogoDiscount() : 0) + getPromotionDiscount();
    const taxable = Math.max(0, subtotal - discount);
    const selectedStore = getSelectedStore();
    const taxRate = selectedStore.taxRate ?? state.settings.taxRate;
    const tax = taxable * ((Number(taxRate) || 0) / 100);
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

  function getPromotionDiscount() {
    return state.promotions
      .filter((promo) => promo.storeId === state.selectedStoreId && promo.active)
      .reduce((sum, promo) => {
        const promoItem = state.items.find((item) => item.id === promo.itemId);
        const line = state.cart.find((cartLine) =>
          cartLine.id === promo.itemId ||
          (promoItem && cartLine.name === promoItem.name && cartLine.storeId === promoItem.storeId)
        );
        if (!line) return sum;
        const groupCount = Math.floor(line.qty / Math.max(1, Number(promo.buyQty) || 1));
        return sum + groupCount * (Number(promo.discountAmount) || 0);
      }, 0);
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
    const selectedStore = getSelectedStore();
    elements.storeName.textContent = selectedStore.name;
    elements.registerStoreName.textContent = selectedStore.name;
    elements.modeLabel.textContent = remoteMode ? "Shared mode" : "Local mode";
    elements.ticketNumber.textContent = `Order #${state.nextOrderNumber}`;
    elements.settingsStoreName.value = selectedStore.name;
    elements.settingsTaxRate.value = selectedStore.taxRate ?? state.settings.taxRate;
    elements.settingsReceiptFooter.value = selectedStore.receiptFooter ?? state.settings.receiptFooter;
    elements.settingsReceiptHeader.value = selectedStore.receiptHeader ?? selectedStore.name;
    renderCategories();
    renderStoreSelect();
    renderStoreList();
    renderRegisterControls();
    renderUserControls();
    renderMenu();
    renderCart();
    renderOrders();
    renderItems();
    renderPromotions();
    renderDashboard();
    renderReports();
    saveState();
  }

  function ensureSelectedStore() {
    if (!Array.isArray(state.stores) || !state.stores.length) {
      state.stores = structuredClone(defaultState.stores);
    }
    if (!Array.isArray(state.registers) || !state.registers.length) {
      state.registers = structuredClone(defaultState.registers);
    }
    if (!Array.isArray(state.promotions)) {
      state.promotions = [];
    }
    if (!Array.isArray(state.users)) {
      state.users = [];
    }
    if (!state.selectedStoreId || !state.stores.some((store) => store.id === state.selectedStoreId)) {
      state.selectedStoreId = state.stores[0].id;
    }
    const requestedStoreId = getRequestedStoreId();
    const requestedStore = state.stores.find((store) => store.id === requestedStoreId);
    if (requestedStore && appMode === "register") {
      state.selectedStoreId = requestedStore.id;
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
    state.items = state.items.map((item) => ({ ...item, storeId: item.storeId || state.stores[0].id, stock: Number(item.stock) || 0, cost: Number(item.cost) || 0 }));
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

  function getStoreRegisterLink(store) {
    return `register.html?store=${encodeURIComponent(store.id)}`;
  }

  function getAbsoluteStoreRegisterLink(store) {
    return new URL(getStoreRegisterLink(store), location.href).href;
  }

  function renderStoreList() {
    if (!elements.storeList) return;
    elements.storeList.innerHTML = "";
    state.stores.forEach((store) => {
      const row = document.createElement("div");
      row.className = "item-list-row store-list-row";
      row.innerHTML = `
        <div>
          <strong>${escapeHtml(store.name)}</strong>
          <div class="line-meta">${escapeHtml(store.address || "No address")} / ${escapeHtml(getAbsoluteStoreRegisterLink(store))}</div>
        </div>
        <a class="secondary-button link-button" href="${getStoreRegisterLink(store)}">Open</a>
        <button class="secondary-button" type="button" data-action="pin">Change PIN</button>
        <button class="secondary-button danger-button" type="button" data-action="delete">Delete</button>
      `;
      row.querySelector('[data-action="pin"]').addEventListener("click", () => changeStorePin(store.id));
      row.querySelector('[data-action="delete"]').addEventListener("click", () => deleteStore(store.id));
      elements.storeList.appendChild(row);
    });
  }

  function changeStorePin(storeId) {
    const store = state.stores.find((candidate) => candidate.id === storeId);
    if (!store) return;
    const currentPin = window.prompt(`Enter current PIN for ${store.name}`);
    if (currentPin !== String(store.pin || "")) {
      window.alert("PIN did not match.");
      return;
    }
    const newPin = window.prompt("Enter new store PIN");
    if (!newPin) return;
    store.pin = String(newPin);
    render();
  }

  function deleteStore(storeId) {
    const store = state.stores.find((candidate) => candidate.id === storeId);
    if (!store) return;
    if (state.stores.length <= 1) {
      window.alert("Create another store before deleting this one.");
      return;
    }
    const currentPin = window.prompt(`Enter PIN to delete ${store.name}`);
    if (currentPin !== String(store.pin || "")) {
      window.alert("PIN did not match.");
      return;
    }
    state.stores = state.stores.filter((candidate) => candidate.id !== storeId);
    state.items = state.items.filter((item) => item.storeId !== storeId);
    state.registers = state.registers.filter((register) => register.storeId !== storeId);
    state.users = state.users.filter((user) => user.storeId !== storeId);
    state.orders = state.orders.filter((order) => order.storeId !== storeId);
    if (state.selectedStoreId === storeId) {
      state.selectedStoreId = state.stores[0].id;
      state.cart = [];
    }
    render();
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

  function renderUserControls() {
    elements.newUserStoreSelect.innerHTML = "";
    state.stores.forEach((store) => {
      const option = document.createElement("option");
      option.value = store.id;
      option.textContent = store.name;
      option.selected = store.id === state.selectedStoreId;
      elements.newUserStoreSelect.appendChild(option);
    });
    elements.userList.innerHTML = "";
    const users = state.users.filter((user) => user.storeId === state.selectedStoreId);
    if (!users.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "No cashier accounts for this store yet";
      elements.userList.appendChild(empty);
      return;
    }
    users.forEach((user) => {
      const row = document.createElement("div");
      row.className = "item-list-row";
      row.innerHTML = `<div><strong>${escapeHtml(user.name)}</strong><div class="line-meta">Cashier access for this store</div></div><span>PIN protected</span><button class="secondary-button danger-button" type="button">Remove</button>`;
      row.querySelector("button").addEventListener("click", () => {
        state.users = state.users.filter((candidate) => candidate.id !== user.id);
        render();
      });
      elements.userList.appendChild(row);
    });
  }

  function getTodaysOrders() {
    const today = new Date().toDateString();
    return state.orders.filter((order) => new Date(order.createdAt).toDateString() === today && (order.storeId || state.selectedStoreId) === state.selectedStoreId);
  }

  function getReportOrders() {
    const range = elements.reportRange ? elements.reportRange.value : "today";
    const orders = state.orders.filter((order) => (order.storeId || state.selectedStoreId) === state.selectedStoreId);
    if (range === "all") return orders;
    const now = new Date();
    if (range === "today") return orders.filter((order) => new Date(order.createdAt).toDateString() === now.toDateString());
    const cutoff = new Date(now);
    cutoff.setHours(0, 0, 0, 0);
    cutoff.setDate(cutoff.getDate() - (Number(range) - 1));
    return orders.filter((order) => new Date(order.createdAt) >= cutoff);
  }

  function renderReportRows(container, rows, emptyText) {
    container.innerHTML = "";
    if (!rows.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state report-empty";
      empty.textContent = emptyText;
      container.appendChild(empty);
      return;
    }
    rows.forEach((rowData) => {
      const row = document.createElement("div");
      row.className = "report-row";
      row.innerHTML = `<div><strong>${escapeHtml(rowData.label)}</strong><span>${escapeHtml(rowData.detail)}</span></div><strong>${escapeHtml(rowData.value)}</strong>`;
      container.appendChild(row);
    });
  }

  function renderReports() {
    if (!elements.reportRange) return;
    const orders = getReportOrders();
    const totals = orders.reduce((summary, order) => {
      summary.gross += Number(order.totals?.subtotal || 0);
      summary.discount += Number(order.totals?.discount || 0);
      summary.tax += Number(order.totals?.tax || 0);
      summary.sales += Number(order.totals?.total || 0);
      (order.items || []).forEach((item) => {
        summary.items += Number(item.qty || 0);
        const existing = summary.bestSellers.get(item.name) || { qty: 0, sales: 0 };
        existing.qty += Number(item.qty || 0);
        existing.sales += Number(item.price || 0) * Number(item.qty || 0);
        summary.bestSellers.set(item.name, existing);
      });
      summary.payments[order.payment || "Other"] = (summary.payments[order.payment || "Other"] || 0) + Number(order.totals?.total || 0);
      return summary;
    }, { gross: 0, discount: 0, tax: 0, sales: 0, items: 0, payments: {}, bestSellers: new Map() });
    const rangeLabels = { today: "today", 7: "the last 7 days", 30: "the last 30 days", all: "all time" };
    elements.reportCaption.textContent = `${orders.length} completed ticket${orders.length === 1 ? "" : "s"} for ${rangeLabels[elements.reportRange.value]}.`;
    elements.reportGrossSales.textContent = price(totals.sales);
    elements.reportDiscounts.textContent = price(totals.discount);
    elements.reportTax.textContent = price(totals.tax);
    elements.reportTicketCount.textContent = String(orders.length);
    elements.reportAverageTicket.textContent = price(orders.length ? totals.sales / orders.length : 0);
    elements.reportItemsSold.textContent = String(totals.items);
    const payments = Object.entries(totals.payments).sort((a, b) => b[1] - a[1]).map(([method, total]) => ({ label: method, detail: "Tender collected", value: price(total) }));
    renderReportRows(elements.paymentReport, payments, "No payments in this period");
    const sellers = [...totals.bestSellers.entries()].sort((a, b) => b[1].qty - a[1].qty || b[1].sales - a[1].sales).slice(0, 8).map(([name, item]) => ({ label: name, detail: `${item.qty} sold`, value: price(item.sales) }));
    renderReportRows(elements.bestSellerReport, sellers, "No items sold in this period");
    const lowStock = state.items.filter((item) => item.storeId === state.selectedStoreId && Number(item.stock) <= 5).sort((a, b) => Number(a.stock) - Number(b.stock)).slice(0, 8).map((item) => ({ label: item.name, detail: item.category, value: `${Number(item.stock) || 0} left` }));
    renderReportRows(elements.lowStockReport, lowStock, "No low-stock items");
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
    elements.inventoryCount.textContent = String(state.items.filter((item) => item.storeId === state.selectedStoreId).length);
    elements.activePromoCount.textContent = String(state.promotions.filter((promo) => promo.storeId === state.selectedStoreId && promo.active).length);
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
      button.className = `menu-item pos-menu-item ${categoryChipClass(item.category)}`;
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
      [candidate.barcode, candidate.sku, candidate.id, receiptBarcodeValue(candidate)].some((candidateCode) => normalizeBarcode(candidateCode) === code)
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
      receiptHeader: getSelectedStore().receiptHeader || getSelectedStore().name,
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
    state.cart.forEach((line) => {
      const item = state.items.find((candidate) => candidate.id === line.id && candidate.storeId === state.selectedStoreId);
      if (item) item.stock = Math.max(0, (Number(item.stock) || 0) - line.qty);
    });
    state.cart = [];
    elements.customerName.value = "";
    elements.ticketNote.value = "";
    showReceipt(order);
    render();
  }

  function getMostRecentOrder() {
    return state.orders.find((order) => (order.storeId || state.selectedStoreId) === state.selectedStoreId);
  }

  function showReceipt(order) {
    const selectedStore = getSelectedStore();
    elements.receiptContent.innerHTML = `
      <h3>${escapeHtml(order.receiptHeader || order.storeName || selectedStore.receiptHeader || selectedStore.name)}</h3>
      <p>Order #${order.id}<br>${new Date(order.createdAt).toLocaleString()}<br>${escapeHtml(order.customer)}<br>${escapeHtml(order.storeName || getSelectedStore().name)} / ${escapeHtml(order.registerName || getSelectedRegister().name)}<br>${escapeHtml(order.source || "In Store")}</p>
      ${order.note ? `<p>Note: ${escapeHtml(order.note)}</p>` : ""}
      ${order.items
        .map(
          (item) => `
            <div class="receipt-line">
              <span>${item.qty} x ${escapeHtml(item.name)}</span>
              <strong>${price(item.qty * item.price)}</strong>
            </div>
            <div class="receipt-item-barcode">
              ${barcodeSvg(item)}
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
      <p>${escapeHtml(selectedStore.receiptFooter ?? state.settings.receiptFooter)}</p>
    `;
    elements.receiptDialog.showModal();
  }

  function receiptBarcodeValue(item) {
    const savedCode = String(item.barcode || item.sku || "").replace(/\D/g, "");
    if (savedCode.length === 12) return savedCode;
    if (savedCode.length === 11) return `${savedCode}${upcCheckDigit(savedCode)}`;
    const seed = String(item.id || item.name || "POS-ITEM");
    let hash = 0;
    for (const character of seed) hash = (hash * 31 + character.charCodeAt(0)) % 100000000000;
    const base = String(Math.floor(hash)).padStart(11, "0");
    return `${base}${upcCheckDigit(base)}`;
  }

  function upcCheckDigit(value) {
    const digits = String(value).replace(/\D/g, "").slice(0, 11);
    const sum = digits.split("").reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
    return String((10 - (sum % 10)) % 10);
  }

  function barcodeSvg(item) {
    const patterns = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];
    const value = receiptBarcodeValue(item);
    const bits = `101${value.slice(0, 6).split("").map((digit) => patterns[Number(digit)]).join("")}01010${value.slice(6).split("").map((digit) => patterns[Number(digit)].split("").map((bit) => bit === "1" ? "0" : "1").join("")).join("")}101`;
    const guardPositions = new Set([0, 1, 2, 45, 46, 47, 48, 49, 92, 93, 94]);
    const bars = [];
    let index = 0;
    while (index < bits.length) {
      if (bits[index] === "0") { index += 1; continue; }
      const start = index;
      let guard = guardPositions.has(index);
      while (index < bits.length && bits[index] === "1") {
        guard = guard || guardPositions.has(index);
        index += 1;
      }
      bars.push(`<rect x="${12 + start * 2}" y="2" width="${(index - start) * 2}" height="${guard ? 48 : 40}"/>`);
    }
    const digitText = `<text x="2" y="62">${value[0]}</text><text x="30" y="62">${value.slice(1, 6)}</text><text x="142" y="62">${value.slice(6, 11)}</text><text x="214" y="62">${value[11]}</text>`;
    return `<svg class="receipt-barcode" viewBox="0 0 230 66" role="img" aria-label="UPC barcode ${value}">${bars.join("")}${digitText}</svg>`;
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
          <div class="line-meta">${escapeHtml(item.category)} / Stock ${Number(item.stock) || 0} / Cost ${price(item.cost || 0)}${item.tender ? " / Tender promo item" : ""}</div>
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

  function renderPromotions() {
    if (!elements.promoItemSelect || !elements.promotionList) return;
    const storeItems = state.items.filter((item) => item.storeId === state.selectedStoreId);
    elements.promoItemSelect.innerHTML = "";
    storeItems.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = `${item.name} - ${price(item.price)}`;
      elements.promoItemSelect.appendChild(option);
    });

    elements.promotionList.innerHTML = "";
    const promos = state.promotions.filter((promo) => promo.storeId === state.selectedStoreId);
    if (!promos.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "No promotions for this store";
      elements.promotionList.appendChild(empty);
      return;
    }

    promos.forEach((promo) => {
      const item = state.items.find((candidate) => candidate.id === promo.itemId);
      const row = document.createElement("div");
      row.className = "item-list-row";
      row.innerHTML = `
        <div>
          <strong>${escapeHtml(promo.name)}</strong>
          <div class="line-meta">${escapeHtml(item ? item.name : "Missing item")} / Buy ${promo.buyQty}, get ${price(promo.discountAmount)} off</div>
        </div>
        <span>${promo.active ? "Active" : "Off"}</span>
        <button class="secondary-button" type="button" data-action="toggle">${promo.active ? "Turn off" : "Turn on"}</button>
        <button class="secondary-button danger-button" type="button" data-action="delete">Delete</button>
      `;
      row.querySelector('[data-action="toggle"]').addEventListener("click", () => {
        promo.active = !promo.active;
        render();
      });
      row.querySelector('[data-action="delete"]').addEventListener("click", () => {
        state.promotions = state.promotions.filter((candidate) => candidate.id !== promo.id);
        render();
      });
      elements.promotionList.appendChild(row);
    });
  }

  function exportOrders(orders = state.orders, filename = "pos-orders.csv") {
    const header = ["order", "customer", "type", "source", "payment", "subtotal", "discount", "tax", "total", "note", "created_at"];
    const rows = orders.map((order) => [
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
    link.download = filename;
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
  document.querySelectorAll("[data-add-store]").forEach((button) => {
    button.addEventListener("click", () => {
      setView("settings");
      elements.newStoreNameInput.focus();
    });
  });
  elements.storeSelect.addEventListener("change", () => {
    state.selectedStoreId = elements.storeSelect.value;
    state.activeCategory = "All";
    state.cart = [];
    render();
  });
  document.querySelectorAll("[data-jump-register]").forEach((button) => button.addEventListener("click", () => setView("register")));
  document.querySelectorAll("[data-jump-items]").forEach((button) => button.addEventListener("click", () => setView("items")));
  document.querySelectorAll("[data-jump-promotions]").forEach((button) => button.addEventListener("click", () => setView("promotions")));
  document.querySelectorAll("[data-jump-orders]").forEach((button) => button.addEventListener("click", () => setView("orders")));
  document.querySelectorAll("[data-jump-reports]").forEach((button) => button.addEventListener("click", () => setView("reports")));
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
  elements.exportOrdersButton.addEventListener("click", () => exportOrders());
  elements.reportRange.addEventListener("change", renderReports);
  elements.exportReportButton.addEventListener("click", () => exportOrders(getReportOrders(), `pos-sales-${elements.reportRange.value}.csv`));
  elements.printReceiptButton.addEventListener("click", () => window.print());
  elements.closeReceiptButton.addEventListener("click", () => elements.receiptDialog.close());
  elements.registerLoginButton.addEventListener("click", () => setLoginRole("register"));
  elements.managerLoginButton.addEventListener("click", () => setLoginRole("back-office"));
  async function logout() {
    if (remoteMode && hydrated) {
      clearTimeout(saveTimer);
      await saveRemoteState();
    }
    try {
      await api("/api/logout", { method: "POST" });
    } catch (error) {
      // The local login screen still protects the next operation if the session already expired.
    }
    hydrated = false;
    state.cart = [];
    setLoginRole(appMode);
    setLoginVisible(true);
    elements.pinInput.focus();
  }
  elements.logoutButton.addEventListener("click", logout);
  elements.managerLogoutButton.addEventListener("click", logout);
  document.querySelectorAll("[data-pay-ticket]").forEach((button) => button.addEventListener("click", completeOrder));
  document.querySelectorAll("[data-focus-customer]").forEach((button) => button.addEventListener("click", () => elements.customerName.focus()));
  document.querySelectorAll("[data-void-line]").forEach((button) => button.addEventListener("click", () => {
    state.cart.pop();
    renderCart();
    saveState();
  }));
  document.querySelectorAll("[data-start-over]").forEach((button) => button.addEventListener("click", () => {
    state.cart = [];
    elements.customerName.value = "";
    elements.ticketNote.value = "";
    renderCart();
    saveState();
  }));
  document.querySelectorAll("[data-show-last-receipt], [data-reprint-last]").forEach((button) => button.addEventListener("click", () => {
    const order = getMostRecentOrder();
    if (order) showReceipt(order);
  }));
  document.querySelectorAll("[data-toggle-discount]").forEach((button) => button.addEventListener("click", () => {
    elements.bogoToggle.checked = !elements.bogoToggle.checked;
    renderCart();
    saveState();
  }));
  document.addEventListener("keydown", (event) => {
    if (appMode !== "register" || elements.loginScreen.hidden === false) return;
    const target = event.target;
    const isTyping = target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement;
    if (event.key === "F2") {
      event.preventDefault();
      completeOrder();
      return;
    }
    if (event.key === "F4") {
      event.preventDefault();
      elements.barcodeScanInput.focus();
      elements.barcodeScanInput.select();
      return;
    }
    if (event.key === "Escape" && state.cart.length) {
      event.preventDefault();
      state.cart = [];
      renderCart();
      saveState();
      return;
    }
    if (!isTyping && event.key === "/") {
      event.preventDefault();
      elements.itemSearch.focus();
    }
  });
  elements.loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    elements.loginMessage.textContent = "Checking...";
    try {
      const login = await api("/api/login", {
        method: "POST",
        body: JSON.stringify({ pin: elements.pinInput.value, mode: loginRole, storeId: getRequestedStoreId() }),
      });
      if (loginRole === "back-office" && appMode !== "back-office") {
        location.assign("./back-office.html");
        return;
      }
      await loadRemoteState(login.storeId || "");
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
      cost: Number(elements.itemCostInput.value) || 0,
      stock: Number(elements.itemStockInput.value) || 0,
      storeId: state.selectedStoreId,
      barcode: elements.itemBarcodeInput.value.trim(),
      tender: elements.itemTenderInput.checked,
    });
    elements.itemForm.reset();
    render();
  });

  elements.promotionForm.addEventListener("submit", (event) => {
    event.preventDefault();
      if (!elements.promoItemSelect.value) return;
    const item = state.items.find((candidate) => candidate.id === elements.promoItemSelect.value);
    state.promotions.push({
      id: uid("promo"),
      storeId: state.selectedStoreId,
      name: elements.promoNameInput.value.trim(),
      itemId: elements.promoItemSelect.value,
      itemName: item ? item.name : "",
      buyQty: Number(elements.promoBuyQtyInput.value) || 1,
      discountAmount: Number(elements.promoDiscountInput.value) || 0,
      active: elements.promoActiveInput.checked,
    });
    elements.promotionForm.reset();
    elements.promoActiveInput.checked = true;
    render();
  });

  elements.settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedStore = getSelectedStore();
    selectedStore.name = elements.settingsStoreName.value.trim() || selectedStore.name;
    selectedStore.taxRate = Number(elements.settingsTaxRate.value) || 0;
    selectedStore.receiptFooter = elements.settingsReceiptFooter.value.trim();
    selectedStore.receiptHeader = elements.settingsReceiptHeader.value.trim() || selectedStore.name;
    state.settings.storeName = selectedStore.name;
    state.settings.taxRate = selectedStore.taxRate;
    state.settings.receiptFooter = selectedStore.receiptFooter;
    render();
  });

  elements.userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = elements.newUserNameInput.value.trim();
    const pin = elements.newUserPinInput.value.trim();
    const storeId = elements.newUserStoreSelect.value;
    if (!name || !pin || !storeId) return;
    const duplicate = state.users.some((user) => String(user.pin) === pin) || state.stores.some((store) => String(store.pin) === pin);
    if (duplicate) {
      window.alert("Each register and cashier must use a different PIN.");
      return;
    }
    state.users.push({ id: uid("user"), name, pin, storeId, role: "cashier" });
    elements.userForm.reset();
    render();
  });

  elements.storeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = elements.newStoreNameInput.value.trim();
    if (!name) return;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || uid("store");
    const id = state.stores.some((store) => store.id === slug) ? `${slug}-${Date.now().toString(36)}` : slug;
    state.stores.push({ id, name, address: elements.newStoreAddressInput.value.trim(), pin: String(elements.newStorePinInput.value.trim() || "1234") });
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
    setLoginRole(appMode);
    setLoginVisible(true);
    loadRemoteState();
  } else {
    render();
    setView(getAllowedViews()[0]);
  }
})();
