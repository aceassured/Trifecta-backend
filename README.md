# Trifecta Backend

This repository contains the TypeScript code for the Trifecta smart lock control application's backend. The backend uses Tuya Cloud API to interact with smart locks, enabling features like user registration, device pairing, and temporary password management.

## Features

- User Registration: Register users and create associated spaces in Tuya Cloud.
- User Login: Authenticate users securely and manage their sessions.
- Device Pairing: Pair devices using QR codes and manage the devices via Tuya Cloud.
- Temporary Passwords: Create and manage temporary passwords for smart locks.
- Control Devices: Send commands to control paired devices.
- Profile Management: Manage user profile information.
- State Management: Handle user states and session tokens securely.

## Development

This project is built with TypeScript, running on a Node.js server. It integrates with Tuya Cloud API for all smart lock-related operations.

### Getting Started

To set up and run the backend server:

1. Clone the Repository:
   ```bash
   git clone https://github.com/your-username/trifecta-backend.git
   ```
2. Install Dependencies:
    ```bash
    npm install
    ```
3. Set Up Environment Variables:<br>
Create a .env file in the root of the project and add the following:
    ```bash
    ACCESS_KEY=your-access-key
    SECRET_KEY=your-secret-key
    ```
4. Build the Project:
   ```bash
   npm run build
   ```
5. Run the Project:
   ```bash
   npm start
   ```


## API Endpoints
<ul>
  <li>POST /api/register: Register a new user.</li>
  <li>POST /api/login: Log in an existing user.</li>
  <li>GET /api/device/:deviceId: Get details of a paired device.</li>
  <li>POST /api/control-device: Send commands to control a device.</li>
  <li>POST /api/CreateTempPass: Create a temporary password for a smart lock.</li>
  <li>GET /api/get-temp-passwords: Retrieve temporary passwords for a device.</li>
  and many more...
</ul>
