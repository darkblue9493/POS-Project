(function () {
  const storageKey = "customStorePos.v1";
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  const remoteMode = location.protocol !== "file:";

  const defaultState = {
    settings: {
      storeName: "Tender House",
      taxRate: 8.25,
      receiptFooter: "Thank you for your order",
    },
    nextOrderNumber: 1001,
    activeCategory: "All",
    orderType: "dine-in",
    payment: "Cash",
    cart: [],
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
      { id: "dessert-cookie", name: "Cookie", category: "Desserts", price: 1.99, tender: false },
    ],
  };

  const elements = {
    storeName: document.getElementById("storeName"),
    modeLabel: document.getElementById("modeLabel"),
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
    ticketNumber: document.getElementById("ticketNumber"),
    customerName: document.getElementById("customerName"),
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
    itemTenderInput: document.getElementById("itemTenderInput"),
    itemList: document.getElementById("itemList"),
    settingsForm: document.getElementById("settingsForm"),
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

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      return saved ? { ...defaultState, ...saved, settings: { ...defaultState.settings, ...saved.settings } } : structuredClone(defaultState);
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
      elements.loginScreen.hidden = true;
      render();
    } catch (error) {
      elements.loginScreen.hidden = false;
      elements.loginMessage.textContent = "";
    }
  }

  async function saveRemoteState() {
    if (!remoteMode || !hydrated) return;
    try {
      await api("/api/state", {
        method: "PUT",
        body: JSON.stringify({
          settings: state.settings,
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
    return ["All", ...Array.from(new Set(state.items.map((item) => item.category)))];
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
    elements.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.view === viewName));
    elements.views.forEach((view) => view.classList.toggle("active", view.id === `${viewName}View`));
    render();
  }

  function render() {
    elements.storeName.textContent = state.settings.storeName;
    elements.modeLabel.textContent = remoteMode ? "Shared mode" : "Local mode";
    elements.ticketNumber.textContent = `Order #${state.nextOrderNumber}`;
    elements.settingsStoreName.value = state.settings.storeName;
    elements.settingsTaxRate.value = state.settings.taxRate;
    elements.settingsReceiptFooter.value = state.settings.receiptFooter;
    renderCategories();
    renderMenu();
    renderCart();
    renderOrders();
    renderItems();
    saveState();
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
        <div class="item-chip chip-${item.category.toLowerCase()}">${item.name.slice(0, 2).toUpperCase()}</div>
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
      orderType: state.orderType,
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
    showReceipt(order);
    render();
  }

  function showReceipt(order) {
    elements.receiptContent.innerHTML = `
      <h3>${escapeHtml(state.settings.storeName)}</h3>
      <p>Order #${order.id}<br>${new Date(order.createdAt).toLocaleString()}<br>${escapeHtml(order.customer)}</p>
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
      row.innerHTML = '<td colspan="6">No orders yet</td>';
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
        <td>${price(order.totals.total)}</td>
        <td>${new Date(order.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</td>
      `;
      row.addEventListener("click", () => showReceipt(order));
      elements.ordersTableBody.appendChild(row);
    });
  }

  function renderItems() {
    elements.itemList.innerHTML = "";
    state.items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "item-list-row";
      row.innerHTML = `
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <div class="line-meta">${escapeHtml(item.category)}${item.tender ? " / Tender promo item" : ""}</div>
        </div>
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
    const header = ["order", "customer", "type", "payment", "subtotal", "discount", "tax", "total", "created_at"];
    const rows = state.orders.map((order) => [
      order.id,
      order.customer,
      order.orderType,
      order.payment,
      order.totals.subtotal.toFixed(2),
      order.totals.discount.toFixed(2),
      order.totals.tax.toFixed(2),
      order.totals.total.toFixed(2),
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

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  elements.tabs.forEach((tab) => tab.addEventListener("click", () => setView(tab.dataset.view)));
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
        body: JSON.stringify({ pin: elements.pinInput.value }),
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

  elements.orderTypeButtons.forEach((button) => button.classList.toggle("active", button.dataset.orderType === state.orderType));
  elements.paymentButtons.forEach((button) => button.classList.toggle("active", button.dataset.payment === state.payment));
  if (remoteMode) {
    elements.loginScreen.hidden = false;
    loadRemoteState();
  } else {
    render();
  }
})();
