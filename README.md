# Vedrix POS

A local first point-of-sale prototype for a quick-service restaurant.

Open `register.html` for the cashier register. Open `back-office.html` for management, reports, item setup, barcode/SKU entry, and settings. Orders and menu changes are saved in the browser on that device when used locally.

## Install on a POS machine

For a shared POS machine, run `npm start` and open `http://localhost:4188/register.html` in Chrome or Edge. Use the browser's **Install app** option to install it as a full-screen POS app. The register screen is designed for touch or barcode scanners that type like a keyboard: press `F4` to focus the scanner, `/` to search, `F2` to complete a ticket, and `Escape` to clear the current ticket.

Open `http://localhost:4188/back-office.html` on a manager device to view the sales report. It shows completed-ticket totals, tax, discounts, payment collection, best sellers, and low-stock items. Set product stock counts in Inventory so the low-stock report is useful. Use distinct register and back-office PINs before using it with staff.

To use it from a register tablet or another device on the same Wi-Fi:

1. Double-click `start-pos-server.bat`.
2. Leave that window open.
3. Open the `Same Wi-Fi device` address shown in the window on the register or tablet.
4. Use the browser menu to add it to the home screen if you want it to feel like an app.

To use it anywhere:

1. Upload this `pos project` folder to a hosting service that runs Node apps, such as Render.
2. Set the app start command to `npm start`.
3. Set `REGISTER_PIN` to the PIN cashiers use.
4. Set `BACK_OFFICE_PIN` to the manager/back-office PIN. It defaults to `4415` when this variable is not set.
5. Open the live website address from any register, tablet, or phone.

The included `render.yaml` is ready for Render's free-friendly setup without a paid disk. The live version uses a PIN screen and shared server storage, but orders/menu can reset after redeploys or server restarts unless you add paid persistent storage later.

Live paths:

- `/register.html` for the register
- `/back-office.html` for the back office

The back office can create multiple stores and any number of registers. Each store gets its own register link, such as `/register.html?store=atlanta`, and its own register PIN. Each item belongs to the selected store, and the register only shows/scans products for that store.

Back-office actions:

- Create a store with its own PIN
- Open/copy the store register link
- Change a store PIN by entering the current PIN first
- Delete a store by entering that store's PIN

Included:

- Sales dashboard with daily sales, order count, average ticket, and payment mix
- Menu grid with categories and search
- Barcode/SKU lookup at the register
- Cart with quantity controls
- Cash, card, and online payment labels
- Order source tracking for in-store, phone, DoorDash manual, and online orders
- Ticket notes
- Sales tax setting
- BOGO tender discount
- Receipt preview and printing
- Order history
- CSV export
- Menu item management
- Back-office item setup with barcode/SKU entry
- Back-office inventory counts and item cost entry
- Back-office promotions such as buy 2, get $2 off
- Back-office store and register setup
- PIN screen when hosted online
- Shared menu/orders when hosted online with server storage

Not included yet:

- Real card processing
- DoorDash/Olo/Toast/Square integrations
- Employee logins
- Kitchen printer routing
