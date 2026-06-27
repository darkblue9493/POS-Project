# Store POS

A local first point-of-sale prototype for a quick-service restaurant.

Open `index.html` in a browser to use it on one device. Orders and menu changes are saved in the browser on that device.

To use it from a register tablet or another device on the same Wi-Fi:

1. Double-click `start-pos-server.bat`.
2. Leave that window open.
3. Open the `Same Wi-Fi device` address shown in the window on the register or tablet.
4. Use the browser menu to add it to the home screen if you want it to feel like an app.

To use it anywhere:

1. Upload this `pos project` folder to a hosting service that runs Node apps, such as Render.
2. Set the app start command to `npm start`.
3. Set `POS_PIN` to a private PIN.
4. Open the live website address from any register, tablet, or phone.

The included `render.yaml` is ready for Render's free-friendly setup without a paid disk. The live version uses a PIN screen and shared server storage, but orders/menu can reset after redeploys or server restarts unless you add paid persistent storage later.

Included:

- Menu grid with categories and search
- Cart with quantity controls
- Cash, card, and online payment labels
- Sales tax setting
- BOGO tender discount
- Receipt preview and printing
- Order history
- CSV export
- Menu item management
- PIN screen when hosted online
- Shared menu/orders when hosted online with server storage

Not included yet:

- Real card processing
- DoorDash/Olo/Toast/Square integrations
- Employee logins
- Kitchen printer routing
