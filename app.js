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
    manualDiscount: 0,
    activeCouponCode: "",
    cart: [],
    orders: [],
    waste: [],
    coupons: [],
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
    registerView: document.getElementById("registerView"),
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
    customRangeFields: document.getElementById("customRangeFields"),
    reportStartDate: document.getElementById("reportStartDate"),
    reportEndDate: document.getElementById("reportEndDate"),
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
    wasteReportSummary: document.getElementById("wasteReportSummary"),
    wasteReportList: document.getElementById("wasteReportList"),
    loginScreen: document.getElementById("loginScreen"),
    sleepScreen: document.getElementById("sleepScreen"),
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
    fullscreenButton: document.getElementById("fullscreenButton"),
    managerLogoutButton: document.getElementById("managerLogoutButton"),
    tabs: Array.from(document.querySelectorAll(".tab-button")),
    configurationTabs: Array.from(document.querySelectorAll(".configuration-tab")),
    configurationPanels: Array.from(document.querySelectorAll("[data-configuration-panel]")),
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
    subtotal: document.getElementById("subtotal"),
    discount: document.getElementById("discount"),
    tax: document.getElementById("tax"),
    total: document.getElementById("total"),
    checkoutButton: document.getElementById("checkoutButton"),
    clearCartButton: document.getElementById("clearCartButton"),
    couponCodeButton: document.getElementById("couponCodeButton"),
    openWasteButton: document.getElementById("openWasteButton"),
    wasteDialog: document.getElementById("wasteDialog"),
    wasteForm: document.getElementById("wasteForm"),
    wasteItemSelect: document.getElementById("wasteItemSelect"),
    wasteQuantityInput: document.getElementById("wasteQuantityInput"),
    wasteReasonInput: document.getElementById("wasteReasonInput"),
    cancelWasteButton: document.getElementById("cancelWasteButton"),
    ordersTableBody: document.getElementById("ordersTableBody"),
    exportOrdersButton: document.getElementById("exportOrdersButton"),
    purgeMode: document.getElementById("purgeMode"),
    purgeBeforeLabel: document.getElementById("purgeBeforeLabel"),
    purgeBeforeDate: document.getElementById("purgeBeforeDate"),
    purgeMonthLabel: document.getElementById("purgeMonthLabel"),
    purgeMonth: document.getElementById("purgeMonth"),
    purgePreview: document.getElementById("purgePreview"),
    deleteOldOrdersButton: document.getElementById("deleteOldOrdersButton"),
    itemForm: document.getElementById("itemForm"),
    itemEditId: document.getElementById("itemEditId"),
    itemNameInput: document.getElementById("itemNameInput"),
    itemCategoryInput: document.getElementById("itemCategoryInput"),
    itemPriceInput: document.getElementById("itemPriceInput"),
    itemCostInput: document.getElementById("itemCostInput"),
    itemStockInput: document.getElementById("itemStockInput"),
    itemBarcodeInput: document.getElementById("itemBarcodeInput"),
    itemTenderInput: document.getElementById("itemTenderInput"),
    itemSubmitButton: document.getElementById("itemSubmitButton"),
    cancelItemEditButton: document.getElementById("cancelItemEditButton"),
    itemList: document.getElementById("itemList"),
    menuLayoutList: document.getElementById("menuLayoutList"),
    inventoryCategoryFilter: document.getElementById("inventoryCategoryFilter"),
    posLayoutPreview: document.getElementById("posLayoutPreview"),
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
    settingsReceiptAddress: document.getElementById("settingsReceiptAddress"),
    settingsReceiptPhone: document.getElementById("settingsReceiptPhone"),
    settingsCouponEnabled: document.getElementById("settingsCouponEnabled"),
    settingsCouponPercent: document.getElementById("settingsCouponPercent"),
    settingsCouponMessage: document.getElementById("settingsCouponMessage"),
    settingsCouponDelay: document.getElementById("settingsCouponDelay"),
    settingsCouponValidity: document.getElementById("settingsCouponValidity"),
    configurationStoreName: document.getElementById("configurationStoreName"),
    userForm: document.getElementById("userForm"),
    newUserNameInput: document.getElementById("newUserNameInput"),
    newUserPinInput: document.getElementById("newUserPinInput"),
    newUserStoreSelect: document.getElementById("newUserStoreSelect"),
    userList: document.getElementById("userList"),
    receiptDialog: document.getElementById("receiptDialog"),
    receiptContent: document.getElementById("receiptContent"),
    printReceiptButton: document.getElementById("printReceiptButton"),
    shareReceiptButton: document.getElementById("shareReceiptButton"),
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
  let currentCashierName = "Cashier 1";
  let registerAudioContext = null;
  let sleepTimer = null;
  let registerSleeping = false;
  const sleepAfterMs = 30 * 60 * 1000;

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
    return appMode === "back-office" ? ["dashboard", "reports", "orders", "items", "layout", "promotions", "settings"] : ["register", "orders"];
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
    if (visible) stopSleepTimer();
    else if (appMode === "register") startSleepTimer();
  }

  function startSleepTimer() {
    stopSleepTimer();
    if (appMode !== "register") return;
    sleepTimer = setTimeout(sleepRegister, sleepAfterMs);
  }

  function stopSleepTimer() {
    clearTimeout(sleepTimer);
    sleepTimer = null;
  }

  function sleepRegister() {
    if (appMode !== "register" || elements.loginScreen.hidden === false) return;
    registerSleeping = true;
    elements.sleepScreen.hidden = false;
    document.body.classList.add("pos-asleep");
  }

  function wakeRegister() {
    if (!registerSleeping) return;
    registerSleeping = false;
    elements.sleepScreen.hidden = true;
    document.body.classList.remove("pos-asleep");
    startSleepTimer();
  }

  function recordRegisterActivity() {
    if (registerSleeping || appMode !== "register" || elements.loginScreen.hidden === false) return;
    startSleepTimer();
  }

  async function enterFullscreen() {
    if (!document.fullscreenEnabled || document.fullscreenElement) return;
    try {
      await document.documentElement.requestFullscreen();
    } catch (error) {
      // Full-screen access remains a browser or device choice.
    }
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
      merged.waste = Array.isArray(merged.waste) ? merged.waste : [];
      merged.coupons = Array.isArray(merged.coupons) ? merged.coupons : [];
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

  async function loadRemoteState(preferredStoreId = "", preferredCashierName = "", initialData = null) {
    if (!remoteMode) return;
    try {
      const data = initialData || await api("/api/state");
      state = {
        ...state,
        ...data.state,
        activeCategory: "All",
        selectedStoreId: preferredStoreId || getRequestedStoreId() || state.selectedStoreId,
        orderType: state.orderType,
        payment: state.payment,
        cart: [],
      };
      currentCashierName = preferredCashierName || data.session?.cashierName || "Cashier 1";
      hydrated = true;
      setLoginVisible(false);
      render(true);
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
          waste: state.waste,
          coupons: state.coupons,
        }),
      });
    } catch (error) {
      elements.modeLabel.textContent = "Offline changes";
    }
  }

  async function persistNow() {
    if (!remoteMode || !hydrated) return;
    clearTimeout(saveTimer);
    await saveRemoteState();
  }

  function uid(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  }

  function price(value) {
    return money.format(Number(value) || 0);
  }

  function playRegisterClick() {
    if (appMode !== "register") return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    try {
      registerAudioContext ||= new AudioContextClass();
      const oscillator = registerAudioContext.createOscillator();
      const gain = registerAudioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(760, registerAudioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(560, registerAudioContext.currentTime + 0.055);
      gain.gain.setValueAtTime(0.045, registerAudioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, registerAudioContext.currentTime + 0.06);
      oscillator.connect(gain).connect(registerAudioContext.destination);
      oscillator.start();
      oscillator.stop(registerAudioContext.currentTime + 0.065);
    } catch (error) {
      // Audio is optional; browsers can block it until a user interaction is trusted.
    }
  }

  function getCategories() {
    return ["All", ...Array.from(new Set(getStoreItems().map((item) => item.category)))];
  }

  function getStoreItems() {
    return state.items
      .filter((item) => item.storeId === state.selectedStoreId)
      .sort((first, second) => itemMenuPosition(first) - itemMenuPosition(second));
  }

  function itemMenuPosition(item) {
    const position = Number(item.menuPosition);
    return Number.isFinite(position) && position > 0 ? position : state.items.indexOf(item) + 1;
  }

  function normalizeMenuPositions(storeId = state.selectedStoreId) {
    state.items
      .filter((item) => item.storeId === storeId)
      .sort((first, second) => itemMenuPosition(first) - itemMenuPosition(second))
      .forEach((item, index) => { item.menuPosition = index + 1; });
  }

  function getCartTotals() {
    const subtotal = state.cart.reduce((sum, line) => sum + line.price * line.qty, 0);
    const coupon = state.coupons.find((candidate) => candidate.code === state.activeCouponCode && !candidate.redeemedAt);
    const couponDiscount = coupon ? subtotal * ((Number(coupon.percent) || 0) / 100) : 0;
    const discount = Math.min(subtotal, Math.max(0, Number(state.manualDiscount) || 0) + getPromotionDiscount() + couponDiscount);
    const taxable = Math.max(0, subtotal - discount);
    const selectedStore = getSelectedStore();
    const taxRate = selectedStore.taxRate ?? state.settings.taxRate;
    const tax = taxable * ((Number(taxRate) || 0) / 100);
    return { subtotal, discount, tax, total: taxable + tax };
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

  function createCoupon(store) {
    if (store.couponEnabled === false) return null;
    const percent = Math.max(0, Math.min(100, Number(store.couponPercent ?? 10)));
    if (!percent) return null;
    const createdAt = new Date();
    const availableAt = new Date(createdAt.getTime() + Math.max(0, Number(store.couponDelayHours ?? 24)) * 60 * 60 * 1000);
    const expiresAt = new Date(createdAt.getTime() + Math.max(1, Number(store.couponValidityDays ?? 7)) * 24 * 60 * 60 * 1000);
    let code = "";
    do { code = Array.from({ length: 7 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]).join(""); } while (state.coupons.some((coupon) => coupon.code === code));
    const coupon = { id: uid("coupon"), code, storeId: store.id, percent, message: String(store.couponMessage || "Get {percent}% off on your next visit").replaceAll("{percent}", String(percent)), createdAt: createdAt.toISOString(), availableAt: availableAt.toISOString(), expiresAt: expiresAt.toISOString(), redeemedAt: "" };
    state.coupons.unshift(coupon);
    return coupon;
  }

  function setView(viewName) {
    const allowed = getAllowedViews();
    const targetView = allowed.includes(viewName) ? viewName : allowed[0];
    elements.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.view === targetView));
    elements.views.forEach((view) => view.classList.toggle("active", view.id === `${targetView}View`));
    render();
  }

  function render(skipSave = false) {
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
    elements.settingsReceiptAddress.value = selectedStore.receiptAddress ?? selectedStore.address ?? "";
    elements.settingsReceiptPhone.value = selectedStore.receiptPhone ?? "";
    elements.settingsCouponEnabled.checked = selectedStore.couponEnabled !== false;
    elements.settingsCouponPercent.value = selectedStore.couponPercent ?? 10;
    elements.settingsCouponMessage.value = selectedStore.couponMessage ?? "Get {percent}% off on your next visit";
    elements.settingsCouponDelay.value = selectedStore.couponDelayHours ?? 24;
    elements.settingsCouponValidity.value = selectedStore.couponValidityDays ?? 7;
    if (elements.configurationStoreName) elements.configurationStoreName.textContent = selectedStore.name;
    renderCategories();
    renderStoreSelect();
    renderStoreList();
    renderRegisterControls();
    renderUserControls();
    renderMenu();
    renderCart();
    renderOrders();
    renderItems();
    renderPosLayout();
    renderPromotions();
    renderDashboard();
    renderReports();
    renderPurgePreview();
    if (!skipSave) saveState();
  }

  async function refreshRemoteState() {
    if (!remoteMode || !hydrated || document.hidden) return;
    try {
      const data = await api("/api/state");
      const selectedStoreId = appMode === "register" ? (data.session?.storeId || state.selectedStoreId) : state.selectedStoreId;
      const cart = state.cart;
      const activeCategory = state.activeCategory;
      const orderType = state.orderType;
      const payment = state.payment;
      state = {
        ...state,
        ...data.state,
        selectedStoreId,
        cart,
        activeCategory,
        orderType,
        payment,
      };
      currentCashierName = data.session?.cashierName || currentCashierName || "Cashier 1";
      render(true);
    } catch (error) {
      // A temporary connection issue must never interrupt an active register.
    }
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
    if (!Array.isArray(state.waste)) state.waste = [];
    if (!Array.isArray(state.coupons)) state.coupons = [];
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
      const cashiers = state.users.filter((user) => user.storeId === store.id);
      row.innerHTML = `
        <div>
          <strong>${escapeHtml(store.name)}</strong>
          <div class="line-meta">${escapeHtml(store.address || "No address")} / ${escapeHtml(getAbsoluteStoreRegisterLink(store))}</div>
          <div class="line-meta">Cashiers: ${cashiers.length ? escapeHtml(cashiers.map((user) => user.name).join(", ")) : "None yet"}</div>
        </div>
        <a class="secondary-button link-button" href="${getStoreRegisterLink(store)}">Open</a>
        <button class="secondary-button" type="button" data-action="edit">Edit</button>
        <button class="secondary-button" type="button" data-action="pin">Change PIN</button>
        <button class="secondary-button danger-button" type="button" data-action="delete">Delete</button>
      `;
      row.querySelector('[data-action="edit"]').addEventListener("click", () => editStore(store.id));
      row.querySelector('[data-action="pin"]').addEventListener("click", () => changeStorePin(store.id));
      row.querySelector('[data-action="delete"]').addEventListener("click", () => deleteStore(store.id));
      elements.storeList.appendChild(row);
    });
  }

  async function editStore(storeId) {
    const store = state.stores.find((candidate) => candidate.id === storeId);
    if (!store) return;
    const name = window.prompt("Store name", store.name);
    if (name === null) return;
    const trimmedName = name.trim();
    if (!trimmedName) {
      window.alert("Store name is required.");
      return;
    }
    const address = window.prompt("Store address", store.address || "");
    if (address === null) return;
    store.name = trimmedName;
    store.address = address.trim();
    render();
    await persistNow();
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
    persistNow();
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
    persistNow();
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
    state.registers.filter((register) => register.storeId === state.selectedStoreId).forEach((register) => {
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
        <button class="secondary-button" type="button" data-action="edit">Edit</button>
        <button class="secondary-button danger-button" type="button" data-action="remove">Remove</button>
      `;
      row.querySelector('[data-action="edit"]').addEventListener("click", () => {
        const name = window.prompt("Register terminal name", register.name);
        if (!name?.trim()) return;
        register.name = name.trim();
        render();
        persistNow();
      });
      row.querySelector('[data-action="remove"]').addEventListener("click", () => {
        if (!window.confirm(`Remove ${register.name}?`)) return;
        state.registers = state.registers.filter((candidate) => candidate.id !== register.id);
        if (!state.registers.some((candidate) => candidate.storeId === state.selectedStoreId)) state.registers.push({ id: `${state.selectedStoreId}-main`, name: "Main Register", storeId: state.selectedStoreId });
        render();
        persistNow();
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
    elements.newUserStoreSelect.value = state.selectedStoreId;
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
      row.innerHTML = `<div><strong>${escapeHtml(user.name)}</strong><div class="line-meta">Cashier access for this store</div></div><span>PIN protected</span><button class="secondary-button" type="button" data-action="edit">Edit</button><button class="secondary-button" type="button" data-action="reset">Reset PIN</button><button class="secondary-button danger-button" type="button" data-action="remove">Remove</button>`;
      row.querySelector('[data-action="edit"]').addEventListener("click", () => editUser(user.id));
      row.querySelector('[data-action="reset"]').addEventListener("click", () => resetUserPin(user.id));
      row.querySelector('[data-action="remove"]').addEventListener("click", () => {
        state.users = state.users.filter((candidate) => candidate.id !== user.id);
        render();
        persistNow();
      });
      elements.userList.appendChild(row);
    });
  }

  async function resetUserPin(userId) {
    const user = state.users.find((candidate) => candidate.id === userId);
    if (!user) return;
    const pin = window.prompt(`Enter a new PIN for ${user.name}`)?.trim();
    if (!pin) return;
    const duplicate = state.users.some((candidate) => candidate.id !== user.id && String(candidate.pin) === pin) || state.stores.some((store) => String(store.pin) === pin);
    if (duplicate) {
      window.alert("Each register and cashier must use a different PIN.");
      return;
    }
    user.pin = pin;
    render();
    await persistNow();
  }

  async function editUser(userId) {
    const user = state.users.find((candidate) => candidate.id === userId);
    if (!user) return;
    const name = window.prompt("Cashier name", user.name);
    if (name === null) return;
    if (!name.trim()) {
      window.alert("Cashier name is required.");
      return;
    }
    user.name = name.trim();
    render();
    await persistNow();
  }

  function getTodaysOrders() {
    const today = new Date().toDateString();
    return getSelectedStoreOrders().filter((order) => new Date(order.createdAt).toDateString() === today);
  }

  function getSelectedStoreOrders() {
    return state.orders.filter((order) => (order.storeId || state.selectedStoreId) === state.selectedStoreId);
  }

  function getReportOrders() {
    const range = elements.reportRange ? elements.reportRange.value : "today";
    const orders = state.orders.filter((order) => (order.storeId || state.selectedStoreId) === state.selectedStoreId);
    if (range === "all") return orders;
    if (range === "custom") {
      const start = elements.reportStartDate.value ? new Date(`${elements.reportStartDate.value}T00:00:00`) : null;
      const end = elements.reportEndDate.value ? new Date(`${elements.reportEndDate.value}T23:59:59.999`) : null;
      return orders.filter((order) => (!start || new Date(order.createdAt) >= start) && (!end || new Date(order.createdAt) <= end));
    }
    const now = new Date();
    if (range === "today") return orders.filter((order) => new Date(order.createdAt).toDateString() === now.toDateString());
    const cutoff = new Date(now);
    cutoff.setHours(0, 0, 0, 0);
    cutoff.setDate(cutoff.getDate() - (Number(range) - 1));
    return orders.filter((order) => new Date(order.createdAt) >= cutoff);
  }

  function getReportWaste() {
    const range = elements.reportRange ? elements.reportRange.value : "today";
    const entries = state.waste.filter((entry) => entry.storeId === state.selectedStoreId);
    if (range === "all") return entries;
    if (range === "custom") {
      const start = elements.reportStartDate.value ? new Date(`${elements.reportStartDate.value}T00:00:00`) : null;
      const end = elements.reportEndDate.value ? new Date(`${elements.reportEndDate.value}T23:59:59.999`) : null;
      return entries.filter((entry) => (!start || new Date(entry.createdAt) >= start) && (!end || new Date(entry.createdAt) <= end));
    }
    const now = new Date();
    if (range === "today") return entries.filter((entry) => new Date(entry.createdAt).toDateString() === now.toDateString());
    const cutoff = new Date(now);
    cutoff.setHours(0, 0, 0, 0);
    cutoff.setDate(cutoff.getDate() - (Number(range) - 1));
    return entries.filter((entry) => new Date(entry.createdAt) >= cutoff);
  }

  function updateCustomRangeFields() {
    const custom = elements.reportRange.value === "custom";
    elements.customRangeFields.hidden = !custom;
    if (!custom) return;
    const today = new Date().toISOString().slice(0, 10);
    if (!elements.reportEndDate.value) elements.reportEndDate.value = today;
    if (!elements.reportStartDate.value) {
      const start = new Date();
      start.setDate(start.getDate() - 6);
      elements.reportStartDate.value = start.toISOString().slice(0, 10);
    }
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
    const rangeLabels = { today: "today", 7: "the last 7 days", 30: "the last 30 days", all: "all time", custom: `${elements.reportStartDate.value || "the beginning"} to ${elements.reportEndDate.value || "today"}` };
    elements.reportCaption.textContent = `${orders.length} completed ticket${orders.length === 1 ? "" : "s"} for ${rangeLabels[elements.reportRange.value]}.`;
    elements.reportGrossSales.textContent = price(totals.sales);
    elements.reportDiscounts.textContent = price(totals.discount);
    elements.reportTax.textContent = price(totals.tax);
    elements.reportTicketCount.textContent = String(orders.length);
    elements.reportAverageTicket.textContent = price(orders.length ? totals.sales / orders.length : 0);
    elements.reportItemsSold.textContent = String(totals.items);
    renderWasteReport();
    const payments = Object.entries(totals.payments).sort((a, b) => b[1] - a[1]).map(([method, total]) => ({ label: method, detail: "Tender collected", value: price(total) }));
    renderReportRows(elements.paymentReport, payments, "No payments in this period");
    const sellers = [...totals.bestSellers.entries()].sort((a, b) => b[1].qty - a[1].qty || b[1].sales - a[1].sales).slice(0, 8).map(([name, item]) => ({ label: name, detail: `${item.qty} sold`, value: price(item.sales) }));
    renderReportRows(elements.bestSellerReport, sellers, "No items sold in this period");
    const lowStock = state.items.filter((item) => item.storeId === state.selectedStoreId && Number(item.stock) <= 5).sort((a, b) => Number(a.stock) - Number(b.stock)).slice(0, 8).map((item) => ({ label: item.name, detail: item.category, value: `${Number(item.stock) || 0} left` }));
    renderReportRows(elements.lowStockReport, lowStock, "No low-stock items");
  }

  function renderWasteReport() {
    if (!elements.wasteReportList) return;
    const entries = getReportWaste();
    const totalQuantity = entries.reduce((sum, entry) => sum + Number(entry.quantity || 0), 0);
    elements.wasteReportSummary.textContent = `${totalQuantity} item${totalQuantity === 1 ? "" : "s"} recorded`;
    const rows = entries
      .slice()
      .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))
      .map((entry) => ({ label: `${entry.itemName} · ${entry.quantity} units`, detail: `${new Date(entry.createdAt).toLocaleString()} · ${entry.cashierName || "Cashier 1"}${entry.reason ? ` · ${entry.reason}` : ""}`, value: "Wasted" }));
    renderReportRows(elements.wasteReportList, rows, "No wastage recorded in this period");
  }

  function getPurgeTargetOrders() {
    const storeOrders = state.orders.filter((order) => (order.storeId || state.selectedStoreId) === state.selectedStoreId);
    if (elements.purgeMode.value === "before") {
      if (!elements.purgeBeforeDate.value) return [];
      const cutoff = new Date(`${elements.purgeBeforeDate.value}T00:00:00`);
      return storeOrders.filter((order) => new Date(order.createdAt) < cutoff);
    }
    if (!elements.purgeMonth.value) return [];
    const [year, month] = elements.purgeMonth.value.split("-").map(Number);
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);
    return storeOrders.filter((order) => new Date(order.createdAt) >= start && new Date(order.createdAt) < end);
  }

  function updatePurgeControls() {
    const byMonth = elements.purgeMode.value === "month";
    elements.purgeBeforeLabel.hidden = byMonth;
    elements.purgeMonthLabel.hidden = !byMonth;
    renderPurgePreview();
  }

  function renderPurgePreview() {
    if (!elements.purgeMode || appMode !== "back-office") return;
    const targetOrders = getPurgeTargetOrders();
    const hasSelection = elements.purgeMode.value === "month" ? Boolean(elements.purgeMonth.value) : Boolean(elements.purgeBeforeDate.value);
    elements.deleteOldOrdersButton.disabled = !hasSelection || targetOrders.length === 0;
    elements.deleteOldOrdersButton.textContent = `Delete ${targetOrders.length} receipt${targetOrders.length === 1 ? "" : "s"}`;
    if (!hasSelection) {
      elements.purgePreview.textContent = "Choose a date or month to review matching receipts.";
      return;
    }
    elements.purgePreview.textContent = targetOrders.length ? `${targetOrders.length} receipt${targetOrders.length === 1 ? "" : "s"} will be permanently deleted from this store.` : "No receipts match this selection.";
  }

  async function deleteOldOrders() {
    if (appMode !== "back-office") return;
    const targetOrders = getPurgeTargetOrders();
    if (!targetOrders.length) return;
    const count = targetOrders.length;
    if (!window.confirm(`Delete ${count} completed receipt${count === 1 ? "" : "s"}? This cannot be undone.`)) return;
    const targets = new Set(targetOrders.map((order) => order.id));
    state.orders = state.orders.filter((order) => !targets.has(order.id));
    render();
    await persistNow();
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

    if (!orders.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "No orders yet";
      elements.recentOrders.appendChild(empty);
      return;
    }

    orders.slice(0, 5).forEach((order) => {
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
    const filtered = getStoreItems().filter((item) => {
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

  function cdbLookupBarcode(value) {
    const digits = String(value || "").replace(/\D/g, "");
    return digits.length === 12 ? digits.slice(0, -1) : digits;
  }

  function barcodeMatches(candidate, scanned) {
    const candidateValue = normalizeBarcode(candidate);
    const scannedValue = normalizeBarcode(scanned);
    return candidateValue === scannedValue || (cdbLookupBarcode(candidateValue) && cdbLookupBarcode(candidateValue) === cdbLookupBarcode(scannedValue));
  }

  function scanBarcode(value) {
    const code = normalizeBarcode(value);
    if (!code) return;
    const item = state.items.find((candidate) =>
      candidate.storeId === state.selectedStoreId &&
      [candidate.barcode, candidate.sku, candidate.id, receiptBarcodeValue(candidate)].some((candidateCode) => barcodeMatches(candidateCode, code))
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
    const store = getSelectedStore();
    const issuedCoupon = createCoupon(store);
    const redeemedCoupon = state.coupons.find((coupon) => coupon.code === state.activeCouponCode && !coupon.redeemedAt);
    if (redeemedCoupon) redeemedCoupon.redeemedAt = new Date().toISOString();
    const order = {
      id: state.nextOrderNumber,
      customer: elements.customerName.value.trim() || "Walk-in",
      storeId: state.selectedStoreId,
      storeName: store.name,
      receiptHeader: store.receiptHeader || store.name,
      receiptAddress: store.receiptAddress || store.address || "",
      receiptPhone: store.receiptPhone || "",
      registerId: state.selectedRegisterId,
      registerName: getSelectedRegister().name,
      cashierName: currentCashierName || "Cashier 1",
      orderType: state.orderType,
      source: elements.orderSource.value,
      note: elements.ticketNote.value.trim(),
      payment: state.payment,
      promo: Number(state.manualDiscount) > 0 ? `Manual discount: ${price(state.manualDiscount)}` : "",
      items: state.cart.map((line) => ({ ...line })),
      totals,
      issuedCoupon,
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
    state.manualDiscount = 0;
    state.activeCouponCode = "";
    render();
  }

  function getMostRecentOrder() {
    return state.orders.find((order) => (order.storeId || state.selectedStoreId) === state.selectedStoreId);
  }

  function showReceipt(order) {
    const selectedStore = getSelectedStore();
    elements.receiptContent.innerHTML = `
      <h3>${escapeHtml(order.receiptHeader || order.storeName || selectedStore.receiptHeader || selectedStore.name)}</h3>
      ${(order.receiptAddress || order.receiptPhone) ? `<p class="receipt-contact">${escapeHtml(order.receiptAddress || "")}${order.receiptAddress && order.receiptPhone ? "<br>" : ""}${escapeHtml(order.receiptPhone || "")}</p>` : ""}
      <p>Order #${order.id}<br>${new Date(order.createdAt).toLocaleString()}<br>${escapeHtml(order.customer)}<br>Cashier: ${escapeHtml(order.cashierName || "Cashier 1")}<br>${escapeHtml(order.source || "In Store")}</p>
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
      ${order.issuedCoupon ? `<hr><div class="receipt-coupon"><strong>${escapeHtml(order.issuedCoupon.message)}</strong><span>Use code: ${escapeHtml(order.issuedCoupon.code)}</span><small>Available ${new Date(order.issuedCoupon.availableAt).toLocaleDateString()} · Expires ${new Date(order.issuedCoupon.expiresAt).toLocaleDateString()}</small></div>` : ""}
      <p>${escapeHtml(selectedStore.receiptFooter ?? state.settings.receiptFooter)}</p>
    `;
    elements.receiptDialog.showModal();
  }

  function receiptBarcodeValue(item) {
    const savedCode = String(item.barcode || item.sku || "").replace(/\D/g, "");
    if (savedCode.length === 13) return savedCode;
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
    const eanParity = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];
    const invert = (pattern) => pattern.split("").map((bit) => bit === "1" ? "0" : "1").join("");
    // EAN-13 has three different digit encodings. G is the reverse-complement
    // of L; using only the complement creates bars that look plausible but a
    // retail scanner cannot decode them.
    const gPattern = (pattern) => invert(pattern).split("").reverse().join("");
    const isEan13 = value.length === 13;
    const leftDigits = isEan13 ? value.slice(1, 7) : value.slice(0, 6);
    const rightDigits = isEan13 ? value.slice(7) : value.slice(6);
    const parity = isEan13 ? eanParity[Number(value[0])] : "LLLLLL";
    const leftBits = leftDigits.split("").map((digit, position) => parity[position] === "G" ? gPattern(patterns[Number(digit)]) : patterns[Number(digit)]).join("");
    const bits = `101${leftBits}01010${rightDigits.split("").map((digit) => invert(patterns[Number(digit)])).join("")}101`;
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
    const digitText = isEan13
      ? `<text x="2" y="62">${value[0]}</text><text x="30" y="62">${value.slice(1, 7)}</text><text x="142" y="62">${value.slice(7)}</text>`
      : `<text x="2" y="62">${value[0]}</text><text x="30" y="62">${value.slice(1, 6)}</text><text x="142" y="62">${value.slice(6, 11)}</text><text x="214" y="62">${value[11]}</text>`;
    return `<svg class="receipt-barcode" viewBox="0 0 230 66" role="img" aria-label="UPC barcode ${value}">${bars.join("")}${digitText}</svg>`;
  }

  function renderOrders() {
    elements.ordersTableBody.innerHTML = "";
    const orders = getSelectedStoreOrders();
    if (!orders.length) {
      const row = document.createElement("tr");
      row.innerHTML = '<td colspan="7">No orders yet</td>';
      elements.ordersTableBody.appendChild(row);
      return;
    }
    orders.forEach((order) => {
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
    const categories = ["All departments", ...Array.from(new Set(getStoreItems().map((item) => item.category)))];
    const previousCategory = elements.inventoryCategoryFilter.value || "All departments";
    elements.inventoryCategoryFilter.innerHTML = categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("");
    elements.inventoryCategoryFilter.value = categories.includes(previousCategory) ? previousCategory : "All departments";
    getStoreItems().filter((item) => elements.inventoryCategoryFilter.value === "All departments" || item.category === elements.inventoryCategoryFilter.value).forEach((item) => {
      const row = document.createElement("div");
      row.className = "item-list-row";
      row.innerHTML = `
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <div class="line-meta">${escapeHtml(item.category)} / Stock ${Number(item.stock) || 0} / Cost ${price(item.cost || 0)}${item.tender ? " / Tender promo item" : ""}</div>
        </div>
        <span>${escapeHtml(item.barcode || "No barcode")}</span>
        <strong>${price(item.price)}</strong>
        <div class="item-row-actions">
          <button class="secondary-button" type="button" data-action="edit">Edit</button>
          <button class="secondary-button danger-button" type="button" data-action="remove">Remove</button>
        </div>
      `;
      row.querySelector('[data-action="edit"]').addEventListener("click", () => startItemEdit(item));
      row.querySelector('[data-action="remove"]').addEventListener("click", () => {
        state.items = state.items.filter((candidate) => candidate.id !== item.id);
        state.cart = state.cart.filter((candidate) => candidate.id !== item.id);
        if (elements.itemEditId.value === item.id) resetItemForm();
        render();
      });
      elements.itemList.appendChild(row);
    });
  }

  function renderPosLayout() {
    if (!elements.posLayoutPreview) return;
    elements.posLayoutPreview.innerHTML = "";
    getStoreItems().forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.draggable = true;
      button.dataset.itemId = item.id;
      button.className = `menu-item pos-menu-item ${categoryChipClass(item.category)}`;
      button.innerHTML = `<strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.category)}</span><strong>${price(item.price)}</strong>`;
      button.addEventListener("dragstart", (event) => event.dataTransfer.setData("text/plain", item.id));
      button.addEventListener("dragover", (event) => event.preventDefault());
      button.addEventListener("drop", async (event) => {
        event.preventDefault();
        const draggedId = event.dataTransfer.getData("text/plain");
        if (!draggedId || draggedId === item.id) return;
        const ordered = getStoreItems().filter((candidate) => candidate.id !== draggedId);
        const targetIndex = ordered.findIndex((candidate) => candidate.id === item.id);
        const moved = state.items.find((candidate) => candidate.id === draggedId);
        ordered.splice(targetIndex, 0, moved);
        ordered.forEach((candidate, index) => { candidate.menuPosition = index + 1; });
        render();
        await persistNow();
      });
      elements.posLayoutPreview.appendChild(button);
    });
  }

  function renderMenuLayout() {
    if (!elements.menuLayoutList) return;
    const items = getStoreItems();
    elements.menuLayoutList.innerHTML = "";
    items.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "item-list-row menu-layout-row";
      row.innerHTML = `<div><strong>${index + 1}. ${escapeHtml(item.name)}</strong><div class="line-meta">${escapeHtml(item.category)} · ${price(item.price)}</div></div><div class="item-row-actions"><button class="secondary-button" type="button" data-action="up" ${index === 0 ? "disabled" : ""}>↑ Up</button><button class="secondary-button" type="button" data-action="down" ${index === items.length - 1 ? "disabled" : ""}>↓ Down</button></div>`;
      row.querySelector('[data-action="up"]').addEventListener("click", () => moveMenuItem(item.id, -1));
      row.querySelector('[data-action="down"]').addEventListener("click", () => moveMenuItem(item.id, 1));
      elements.menuLayoutList.appendChild(row);
    });
  }

  async function moveMenuItem(itemId, direction) {
    normalizeMenuPositions();
    const items = getStoreItems();
    const index = items.findIndex((item) => item.id === itemId);
    const other = items[index + direction];
    if (index < 0 || !other) return;
    const current = items[index];
    const currentPosition = current.menuPosition;
    current.menuPosition = other.menuPosition;
    other.menuPosition = currentPosition;
    normalizeMenuPositions();
    render();
    await persistNow();
  }

  function startItemEdit(item) {
    elements.itemEditId.value = item.id;
    elements.itemNameInput.value = item.name;
    elements.itemCategoryInput.value = item.category;
    elements.itemPriceInput.value = item.price;
    elements.itemCostInput.value = item.cost || "";
    elements.itemStockInput.value = item.stock || 0;
    elements.itemBarcodeInput.value = item.barcode || "";
    elements.itemTenderInput.checked = Boolean(item.tender);
    elements.itemSubmitButton.textContent = "Save item";
    elements.cancelItemEditButton.hidden = false;
    elements.itemNameInput.focus();
  }

  function resetItemForm() {
    elements.itemForm.reset();
    elements.itemEditId.value = "";
    elements.itemSubmitButton.textContent = "Add item";
    elements.cancelItemEditButton.hidden = true;
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

  function exportOrders(orders = getSelectedStoreOrders(), filename = "pos-orders.csv") {
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
  elements.configurationTabs.forEach((tab) => tab.addEventListener("click", () => {
    elements.configurationTabs.forEach((candidate) => candidate.classList.toggle("active", candidate === tab));
    elements.configurationPanels.forEach((panel) => { panel.hidden = panel.dataset.configurationPanel !== tab.dataset.configuration; });
  }));
  elements.registerView.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button && !button.disabled) {
      enterFullscreen();
      playRegisterClick();
    }
  });
  elements.fullscreenButton.addEventListener("click", enterFullscreen);
  elements.sleepScreen.addEventListener("click", wakeRegister);
  document.addEventListener("pointerdown", recordRegisterActivity);
  document.addEventListener("keydown", recordRegisterActivity);
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
  elements.inventoryCategoryFilter.addEventListener("change", renderItems);
  elements.barcodeScanInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      scanBarcode(elements.barcodeScanInput.value);
    }
  });
  elements.checkoutButton.addEventListener("click", completeOrder);
  elements.clearCartButton.addEventListener("click", () => {
    state.cart = [];
    state.manualDiscount = 0;
    state.activeCouponCode = "";
    renderCart();
    saveState();
  });
  elements.openWasteButton.addEventListener("click", () => {
    elements.wasteItemSelect.innerHTML = "";
    getStoreItems().forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.name;
      elements.wasteItemSelect.appendChild(option);
    });
    if (!elements.wasteItemSelect.options.length) return;
    elements.wasteQuantityInput.value = "1";
    elements.wasteReasonInput.value = "";
    elements.wasteDialog.showModal();
  });
  elements.cancelWasteButton.addEventListener("click", () => elements.wasteDialog.close());
  elements.couponCodeButton.addEventListener("click", () => {
    if (!state.cart.length) return;
    const code = window.prompt("Enter coupon code")?.trim().toUpperCase();
    if (!code) return;
    const coupon = state.coupons.find((candidate) => candidate.code === code && candidate.storeId === state.selectedStoreId);
    const now = Date.now();
    if (!coupon) return window.alert("Coupon code was not found for this store.");
    if (coupon.redeemedAt) return window.alert("This coupon has already been used.");
    if (now < new Date(coupon.availableAt).getTime()) return window.alert(`This coupon is available after ${new Date(coupon.availableAt).toLocaleString()}.`);
    if (now > new Date(coupon.expiresAt).getTime()) return window.alert("This coupon has expired.");
    state.activeCouponCode = coupon.code;
    renderCart();
    window.alert(`${coupon.percent}% coupon applied.`);
  });
  elements.wasteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const item = state.items.find((candidate) => candidate.id === elements.wasteItemSelect.value && candidate.storeId === state.selectedStoreId);
    const quantity = Math.floor(Number(elements.wasteQuantityInput.value));
    if (!item || !Number.isFinite(quantity) || quantity < 1) return;
    state.waste.unshift({ id: uid("waste"), storeId: state.selectedStoreId, itemId: item.id, itemName: item.name, quantity, reason: elements.wasteReasonInput.value.trim(), cashierName: currentCashierName || "Cashier 1", createdAt: new Date().toISOString() });
    elements.wasteDialog.close();
    render();
    await persistNow();
  });
  elements.exportOrdersButton.addEventListener("click", () => exportOrders());
  elements.purgeMode.addEventListener("change", updatePurgeControls);
  elements.purgeBeforeDate.addEventListener("change", renderPurgePreview);
  elements.purgeMonth.addEventListener("change", renderPurgePreview);
  elements.deleteOldOrdersButton.addEventListener("click", deleteOldOrders);
  elements.reportRange.addEventListener("change", () => { updateCustomRangeFields(); renderReports(); });
  elements.reportStartDate.addEventListener("change", renderReports);
  elements.reportEndDate.addEventListener("change", renderReports);
  elements.exportReportButton.addEventListener("click", () => {
    const suffix = elements.reportRange.value === "custom" ? `${elements.reportStartDate.value || "start"}-to-${elements.reportEndDate.value || "end"}` : elements.reportRange.value;
    exportOrders(getReportOrders(), `pos-sales-${suffix}.csv`);
  });
  function printThermalReceipt() {
    const printWindow = window.open("", "_blank", "width=380,height=720");
    if (!printWindow) {
      // A browser can block pop-ups. The normal print flow is still available
      // in that case rather than preventing a completed sale from printing.
      window.print();
      return;
    }
    const receipt = elements.receiptContent.innerHTML;
    printWindow.document.write(`<!doctype html>
      <html><head><meta charset="utf-8"><title>Vedrix receipt</title>
      <style id="thermalPageSize">@page { size: 72mm 120mm; margin: 0; }</style>
      <style>
        * { box-sizing: border-box; }
        html, body { width: 72mm; min-height: 0; margin: 0; padding: 0; background: #fff; color: #111; }
        body { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
        .receipt { width: 64mm; margin: 0 auto; padding: 4mm 0 5mm; font-size: 11pt; line-height: 1.25; }
        .receipt h3, .receipt p { margin: 0 0 3mm; }
        .receipt h3, .receipt > p:last-child { text-align: center; letter-spacing: .03em; }
        .receipt-contact, .receipt-coupon { text-align: center; }
        .receipt-coupon { display: grid; gap: 1.5mm; padding: 3mm 0; }
        .receipt-coupon span { font-size: 13pt; font-weight: 700; }
        .receipt-coupon small { font-size: 8.5pt; }
        .receipt-line { display: flex; justify-content: space-between; gap: 3mm; margin: 1.5mm 0; }
        .receipt-item-barcode { margin: 0 0 3mm; text-align: center; }
        .receipt-barcode { display: block; width: 56mm; height: auto; min-height: 20mm; margin: 1mm auto 3mm; fill: #111; shape-rendering: crispEdges; }
        .receipt-barcode text { font: 10px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; letter-spacing: 1px; }
        hr { border: 0; border-top: 1px solid #777; margin: 3mm 0; }
      </style></head><body><main class="receipt" id="thermalReceipt">${receipt}</main>
      <script>
        addEventListener('load', () => {
          const receipt = document.getElementById('thermalReceipt');
          const pixelsPerMillimeter = 96 / 25.4;
          const receiptHeight = Math.max(70, Math.ceil((receipt.getBoundingClientRect().height + 12) / pixelsPerMillimeter));
          document.getElementById('thermalPageSize').textContent = '@page { size: 72mm ' + receiptHeight + 'mm; margin: 0; }';
          setTimeout(() => print(), 120);
        });
        addEventListener('afterprint', () => close());
      </script></body></html>`);
    printWindow.document.close();
  }

  function receiptImageBlob() {
    return new Promise((resolve, reject) => {
      const width = 576; // 72 mm at 203 dpi, the configured printer resolution.
      const margin = 32;
      const source = document.createElement("canvas");
      source.width = width;
      source.height = 6000;
      const context = source.getContext("2d");
      context.fillStyle = "#fff";
      context.fillRect(0, 0, source.width, source.height);
      context.fillStyle = "#111";
      context.textBaseline = "top";
      let y = 28;
      const maxWidth = width - margin * 2;
      const writeWrapped = (text, x, align = "left", bold = false, size = 20) => {
        context.font = `${bold ? "700" : "400"} ${size}px ui-monospace, monospace`;
        context.textAlign = align;
        String(text).split("\n").forEach((paragraph) => {
          const words = paragraph.split(/\s+/).filter(Boolean);
          let line = "";
          words.forEach((word) => {
            const candidate = line ? `${line} ${word}` : word;
            if (context.measureText(candidate).width > maxWidth && line) {
              context.fillText(line, x, y);
              y += size + 7;
              line = word;
            } else {
              line = candidate;
            }
          });
          context.fillText(line, x, y);
          y += size + 7;
        });
      };
      const receiptChildren = Array.from(elements.receiptContent.children);
      receiptChildren.forEach((node) => {
        if (node.tagName === "H3") {
          writeWrapped(node.textContent, width / 2, "center", true, 22);
          y += 8;
        } else if (node.tagName === "P") {
          writeWrapped(node.innerText, node.classList.contains("receipt-contact") ? width / 2 : margin, node.classList.contains("receipt-contact") ? "center" : "left", false, 19);
          y += 5;
        } else if (node.classList.contains("receipt-line")) {
          const label = node.querySelector("span")?.textContent || "";
          const amount = node.querySelector("strong")?.textContent || "";
          context.font = "400 19px ui-monospace, monospace";
          context.textAlign = "left";
          context.fillText(label, margin, y);
          context.font = "700 19px ui-monospace, monospace";
          context.textAlign = "right";
          context.fillText(amount, width - margin, y);
          y += 28;
        } else if (node.classList.contains("receipt-item-barcode")) {
          const barcode = node.querySelector("svg");
          const barcodeWidth = 448;
          const barcodeX = (width - barcodeWidth) / 2;
          const scale = barcodeWidth / 230;
          barcode?.querySelectorAll("rect").forEach((bar) => {
            context.fillRect(
              barcodeX + Number(bar.getAttribute("x")) * scale,
              y + Number(bar.getAttribute("y")) * scale,
              Number(bar.getAttribute("width")) * scale,
              Number(bar.getAttribute("height")) * scale
            );
          });
          const value = barcode?.getAttribute("aria-label")?.replace(/\D/g, "") || "";
          context.font = "16px ui-monospace, monospace";
          context.textAlign = "center";
          context.fillText(value, width / 2, y + 103);
          y += 132;
        } else if (node.tagName === "HR") {
          context.fillRect(margin, y + 5, maxWidth, 1);
          y += 18;
        } else if (node.classList.contains("receipt-coupon")) {
          Array.from(node.children).forEach((child, index) => writeWrapped(child.textContent, width / 2, "center", index < 2, index === 1 ? 24 : 18));
          y += 8;
        }
      });
      const output = document.createElement("canvas");
      output.width = width;
      output.height = Math.ceil(y + 28);
      const outputContext = output.getContext("2d");
      outputContext.drawImage(source, 0, 0, width, output.height, 0, 0, width, output.height);
      output.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Could not create receipt image")), "image/png");
    });
  }

  async function shareReceiptToPrinter() {
    const receiptText = elements.receiptContent.innerText
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    if (!navigator.share) {
      elements.shareReceiptButton.textContent = "Sharing unavailable";
      return;
    }
    try {
      const receiptImage = new File([await receiptImageBlob()], "vedrix-receipt.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [receiptImage] })) {
        await navigator.share({ title: "Vedrix POS receipt", text: "Receipt ready to print", files: [receiptImage] });
      } else {
        await navigator.share({ title: "Vedrix POS receipt", text: receiptText });
      }
    } catch (error) {
      elements.shareReceiptButton.textContent = "Could not share receipt";
      setTimeout(() => { elements.shareReceiptButton.textContent = "Send full receipt"; }, 2200);
    }
  }

  elements.printReceiptButton.addEventListener("click", printThermalReceipt);
  elements.shareReceiptButton.addEventListener("click", shareReceiptToPrinter);
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
    if (remoteMode) {
      stopSleepTimer();
      location.assign("./");
      return;
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
    state.manualDiscount = 0;
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
    const subtotal = state.cart.reduce((sum, line) => sum + line.price * line.qty, 0);
    if (!subtotal) return;
    const value = window.prompt(`Discount amount (up to ${price(subtotal)})`, state.manualDiscount ? Number(state.manualDiscount).toFixed(2) : "");
    if (value === null) return;
    const amount = Number(String(value).replace(/[$,\s]/g, ""));
    if (!Number.isFinite(amount) || amount < 0) {
      window.alert("Enter a valid discount amount.");
      return;
    }
    state.manualDiscount = Math.min(subtotal, amount);
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
      await loadRemoteState(login.storeId || "", login.cashierName || "", login.state ? { state: login.state, session: login } : null);
    } catch (error) {
      elements.loginMessage.textContent = error.message;
    }
  });

  elements.itemForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const itemId = elements.itemEditId.value;
    const item = {
      id: itemId || uid("item"),
      name: elements.itemNameInput.value.trim(),
      category: elements.itemCategoryInput.value.trim(),
      price: Number(elements.itemPriceInput.value),
      cost: Number(elements.itemCostInput.value) || 0,
      stock: Number(elements.itemStockInput.value) || 0,
      menuPosition: itemId ? (state.items.find((candidate) => candidate.id === itemId)?.menuPosition || 0) : getStoreItems().length + 1,
      storeId: state.selectedStoreId,
      barcode: elements.itemBarcodeInput.value.trim(),
      tender: elements.itemTenderInput.checked,
    };
    const existingIndex = state.items.findIndex((candidate) => candidate.id === itemId && candidate.storeId === state.selectedStoreId);
    if (existingIndex >= 0) state.items[existingIndex] = item;
    else state.items.push(item);
    state.cart = state.cart.map((line) => line.id === item.id ? { ...line, ...item, qty: line.qty } : line);
    resetItemForm();
    render();
  });
  elements.cancelItemEditButton.addEventListener("click", resetItemForm);

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

  elements.settingsForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const selectedStore = getSelectedStore();
    selectedStore.name = elements.settingsStoreName.value.trim() || selectedStore.name;
    selectedStore.taxRate = Number(elements.settingsTaxRate.value) || 0;
    selectedStore.receiptFooter = elements.settingsReceiptFooter.value.trim();
    selectedStore.receiptHeader = elements.settingsReceiptHeader.value.trim() || selectedStore.name;
    selectedStore.receiptAddress = elements.settingsReceiptAddress.value.trim();
    selectedStore.address = selectedStore.receiptAddress;
    selectedStore.receiptPhone = elements.settingsReceiptPhone.value.trim();
    selectedStore.couponEnabled = elements.settingsCouponEnabled.checked;
    selectedStore.couponPercent = Math.max(0, Math.min(100, Number(elements.settingsCouponPercent.value) || 0));
    selectedStore.couponMessage = elements.settingsCouponMessage.value.trim() || "Get {percent}% off on your next visit";
    selectedStore.couponDelayHours = Math.max(0, Number(elements.settingsCouponDelay.value) || 0);
    selectedStore.couponValidityDays = Math.max(1, Number(elements.settingsCouponValidity.value) || 1);
    state.settings.storeName = selectedStore.name;
    state.settings.taxRate = selectedStore.taxRate;
    state.settings.receiptFooter = selectedStore.receiptFooter;
    render();
    await persistNow();
  });

  elements.userForm.addEventListener("submit", async (event) => {
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
    await persistNow();
  });

  elements.storeForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = elements.newStoreNameInput.value.trim();
    if (!name) return;
    const sourceStoreId = state.selectedStoreId;
    const sourceStore = getSelectedStore();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || uid("store");
    const id = state.stores.some((store) => store.id === slug) ? `${slug}-${Date.now().toString(36)}` : slug;
    state.stores.push({
      id,
      name,
      address: elements.newStoreAddressInput.value.trim(),
      pin: String(elements.newStorePinInput.value.trim() || "1234"),
      taxRate: sourceStore.taxRate ?? state.settings.taxRate,
      receiptHeader: sourceStore.receiptHeader || sourceStore.name,
      receiptFooter: sourceStore.receiptFooter ?? state.settings.receiptFooter
    });
    const itemIds = new Map();
    state.items.filter((item) => item.storeId === sourceStoreId).forEach((item) => {
      const newItemId = `${item.id}-${id}`;
      itemIds.set(item.id, newItemId);
      state.items.push({ ...structuredClone(item), id: newItemId, storeId: id, barcode: item.barcode || item.sku || item.id });
    });
    state.promotions.filter((promo) => promo.storeId === sourceStoreId).forEach((promo) => {
      state.promotions.push({ ...structuredClone(promo), id: uid("promo"), storeId: id, itemId: itemIds.get(promo.itemId) || promo.itemId });
    });
    state.registers.push({ id: `${id}-main`, name: "Main Register", storeId: id });
    state.selectedStoreId = id;
    state.selectedRegisterId = `${id}-main`;
    state.activeCategory = "All";
    state.cart = [];
    elements.storeForm.reset();
    render();
    await persistNow();
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
  updateCustomRangeFields();
  if (remoteMode) {
    setLoginRole(appMode);
    setLoginVisible(true);
    loadRemoteState();
    if (appMode === "register") {
      window.setInterval(refreshRemoteState, 10000);
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden) refreshRemoteState();
      });
    }
  } else {
    render();
    setView(getAllowedViews()[0]);
  }
})();
