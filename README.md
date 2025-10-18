# Zone Tribe Mini-Wallet System – Frontend

## Backend URL
```
https://github.com/Jojo-GitH2/zone-tribe-wallet-backend
```

## Table of Contents

- [Zone Tribe Mini-Wallet System – Frontend](#zone-tribe-mini-wallet-system--frontend)
  - [Table of Contents](#table-of-contents)
  - [1. System Architecture](#1-system-architecture)
  - [2. Setup Instructions](#2-setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Local Development](#local-development)
    - [Docker Deployment](#docker-deployment)
  - [3. User Guide](#3-user-guide)
    - [Authentication](#authentication)
    - [Wallet Management](#wallet-management)
    - [Funding Wallet](#funding-wallet)
    - [Transaction History](#transaction-history)
    - [Notifications](#notifications)
  - [4. Project Structure](#4-project-structure)
  - [5. Key Features](#5-key-features)
  - [6. Development Notes](#6-development-notes)
  - [7. Troubleshooting](#7-troubleshooting)
  - [8. Credits](#8-credits)

---

## 1. System Architecture

The Mini-Wallet System frontend is a **React + TypeScript** SPA that interacts with a .NET backend API.  
It provides a user-friendly interface for wallet management, transaction history, searching, exporting, and notifications.

**Key Technologies:**
- React 
- TypeScript
- Material-UI (MUI)
- Context API (for authentication and notifications)
- Axios (API requests)
- Docker (containerization)

---

## 2. Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (for containerization)
- Access to the backend API

### Local Development

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd zone-tribe-wallet-frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory.
   - Set the backend API URL:
     ```
     VITE_API_URL=http://localhost:5063/api
     ```

4. **Run the development server:**
   ```sh
   npm run dev
   ```
   - The app will be available at [http://localhost:5173](http://localhost:5173).

### Docker Deployment

1. **Build the Docker image:**
   ```sh
   docker build -t zone-tribe-wallet-frontend .
   ```

2. **Run the Docker container:**
   ```sh
   docker run -p 8080:80 --env VITE_API_URL=http://<backend-host>:<backend-port>/api zone-tribe-wallet-frontend
   ```
   - The app will be available at [http://localhost:8080](http://localhost:8080).

---

## 3. User Guide

### Authentication

- **Login:**  
  Enter your email and password on the login page. If you don’t have an account, click “Sign Up” to register.
- **Registration:**  
  Fill in your email and password (with confirmation) to create a new account.

### Wallet Management

- **Add Account:**  
  Click “+ Add an account” in the wallet dropdown. Enter a wallet name and create your wallet. The wallet address will be shown as a QR code.
- **Switch Wallets:**  
  Use the wallet dropdown in the top bar to switch between your wallets.
- **Refresh Wallets:**  
  Click the refresh icon in the wallet dropdown to update your wallet list and balances.

### Funding Wallet

- **Send Funds:**  
  Click the “Send” button, enter the recipient address and amount, and confirm. You’ll see a loading indicator and a notification on success or failure.

### Transaction History

- **View Transactions:**  
  Go to the “Transactions” tab to see your transaction history, paginated for performance.
- **Search Transactions:**  
  Use the search bar to filter by date (`YYYY-MM-DD`), amount (e.g., `0.001`), or transaction ID. Results are paginated.
- **Export Transactions:**  
  Click the export icon to download your transaction history as CSV or PDF.
- **Refresh Transactions:**  
  Click the refresh icon to reload the latest transactions.

### Notifications

- **View Notifications:**  
  Click the notifications icon in the top bar to see recent actions (e.g., funds sent/received, account created).
- **Clear Notifications:**  
  Click “Clear All” in the notifications dropdown to remove all notifications.


<!-- ### Real-Time Updates

- **Automatic Updates:**  
  When funds are received, the transaction history and notifications update automatically (if SignalR is connected). -->


---

## 4. Project Structure

```
src/
  assets/                # Images and logos
  components/            # React components (UI, modals, tables, etc.)
  context/               # React Contexts (auth, notifications)
  pages/                 # Page-level components (Dashboard, Login, Register, Landing)
  services/              # API service modules (auth, wallet, transaction)
  types/                 # TypeScript type definitions
  utils/                 # Utility functions (e.g., claim mapping)
  App.tsx                # Main app component with routing
  main.tsx               # Entry point
  theme.ts               # MUI theme customization
  index.css, App.css     # Global styles
Dockerfile               # Docker build instructions
.env                     # Environment variables
```

---

## 5. Key Features

- **Authentication:** Secure login and registration with JWT.
- **Wallet Management:** Create, select, and refresh wallets.
- **Funding:** Send funds to other wallets.
- **Transaction History:** Paginated, searchable, and exportable.
- **Notifications:** Real-time feedback for all major actions.
- **Loading States:** Visual feedback for all async actions.
<!-- - **Real-Time Updates:** SignalR integration for instant transaction updates. -->
<!-- - **Responsive Design:** Works on desktop and mobile. -->
- **Dockerized:** Easy to deploy as a container.

---

## 6. Development Notes

- **API Integration:** All API calls are handled via the `services/` directory using Axios. Auth tokens are managed automatically.
- **State Management:** Context API is used for authentication and notifications. Local state is used for UI and loading.
- **Error Handling:** Errors are shown to users via alerts or notifications.
- **Security:** JWT tokens are stored in `localStorage`. All protected routes/components check for authentication.
- **Customization:** The app uses a custom Material-UI theme for branding.
- **Extensibility:** The codebase is modular and easy to extend for new features.

---

## 7. Troubleshooting

- **CORS Issues:**  
  Ensure your backend allows CORS from the frontend origin and supports credentials.
- **API URL:**  
  If the frontend cannot reach the backend, check the `VITE_API_URL` in your `.env` or Docker environment.
<!-- - **Real-Time Updates:**  
  If SignalR is not working, check backend CORS and SignalR configuration. -->

---

## 8. Credits

- Developed by [Jonah Uka](https://github.com/Jojo-GitH2) (2024/2025)
- For questions or support, contact the project maintainers.

---
