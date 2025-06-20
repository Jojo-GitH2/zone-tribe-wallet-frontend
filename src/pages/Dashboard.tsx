import React, { useState, useEffect, useContext, lazy, Suspense } from "react";
import { Box } from "@mui/material";
import { NotificationContext } from "../context/notificationContext";
import { fetchUserWallets } from "../services/walletService";
import { Wallet } from "../types/wallet";
import LoaderOverlay from "../components/LoaderOverlay";

const Sidebar = lazy(() => import("../components/SideBar"));
const TopBar = lazy(() => import("../components/TopBar"));
const ActionButtons = lazy(() => import("../components/ActionButtons"));
const WalletSection = lazy(() => import("../components/WalletSection"));
const TabsSection = lazy(() => import("../components/TabsSection"));

const Dashboard: React.FC = () => {
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null);
  const [refreshTransactionsFlag, setRefreshTransactionsFlag] = useState(0);
  const [lastNotifId, setLastNotifId] = useState<string | null>(null);
  const [walletsLoading, setWalletsLoading] = useState(true);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const notificationContext = useContext(NotificationContext);
  const globalLoading =
    walletsLoading ||
    transactionsLoading ||
    notificationContext?.loading;

  const handleSidebarToggle = (isOpen: boolean) => {
    setSidebarWidth(isOpen ? 200 : 50); // Adjust width based on collapse state
  };

  const refreshWallets = async () => {
    setWalletsLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setWalletsLoading(false);
      return;
    }
    const data = await fetchUserWallets(token);
    console.log("Fetched wallets - Dashboard:", data);
    setWallets(data);
    // console.log("Wallets after refresh:", data);

    setCurrentWallet((prev) => {
      if (prev) {
        const updated = data.find((w: { id: string }) => w.id === prev.id);
        // Always return a new object reference if found, or fallback to first wallet
        return updated ? { ...updated } : data.length > 0 ? data[0] : null;
      }
      return data.length > 0 ? data[0] : null;
    });
    setWalletsLoading(false);
  };

  useEffect(() => {
    // Only refresh wallets on mount
    refreshWallets();
    console.log("Dashboard refresh");
  }, []);

  // useEffect(() => {
  //   // Only start SignalR if user is authenticated and token exists
  //   const token = localStorage.getItem("accessToken");
  //   if (!token) return;

  //   // Show notification when a transaction is received
  //   const handleTransactionReceived = () => {
  //     refreshWallets();
  //     setRefreshTransactionsFlag((f) => f + 1);
  //   };

  //   startSignalRConnection(handleTransactionReceived, () => {});
  //   return () => {
  //     stopSignalRConnection();
  //   };
  // }, []);

  // Step 2: Listen for new notifications and refresh wallets if needed
  useEffect(() => {
    if (!notificationContext) return;
    if (notificationContext.notifications.length === 0) return;

    const latest = notificationContext.notifications[0];
    if (
      latest &&
      latest.id !== lastNotifId &&
      (latest.message.includes("Received") || latest.message.includes("Sent"))
    ) {
      setLastNotifId(latest.id);
      refreshWallets();
      console.log("Notifications refresh");
      setRefreshTransactionsFlag((f) => f + 1);
    }
  }, [notificationContext?.notifications]);

  // When currentWallet changes, fetch transactions
  useEffect(() => {
    if (!currentWallet) {
      setTransactionsLoading(false);
      return;
    }
    setTransactionsLoading(true);
    setTimeout(() => setTransactionsLoading(false), 500); 
  }, [currentWallet]);

  const handleWalletSelect = (wallet: Wallet) => setCurrentWallet(wallet);

  return (
    <Box sx={{ display: "flex", position: "relative", minHeight: "100vh" }}>
      {globalLoading && <LoaderOverlay message="Loading your wallet..." />}
      <Suspense fallback={<LoaderOverlay message="Loading sidebar..." />}>
        <Sidebar
          onToggle={handleSidebarToggle}
          currentWallet={currentWallet}
          refreshWallets={refreshWallets}
        />
      </Suspense>
      <Box sx={{ flexGrow: 1, p: 3, position: "relative" }}>
        <Suspense fallback={<LoaderOverlay message="Loading top bar..." />}>
          <TopBar
            sidebarWidth={sidebarWidth}
            wallets={wallets}
            currentWallet={currentWallet}
            onWalletSelect={handleWalletSelect}
            refreshWallets={refreshWallets}
          />
        </Suspense>
        <Suspense fallback={<LoaderOverlay message="Loading actions..." />}>
          <ActionButtons
            currentWallet={currentWallet}
            refreshWallets={refreshWallets}
          />
        </Suspense>
        <Suspense
          fallback={<LoaderOverlay message="Loading wallet section..." />}
        >
          <WalletSection currentWallet={currentWallet} />
        </Suspense>
        <Suspense
          fallback={<LoaderOverlay message="Loading transactions..." />}
        >
          <TabsSection
            currentWallet={currentWallet}
            refreshTrigger={refreshTransactionsFlag}
          />
        </Suspense>
      </Box>
    </Box>
  );
};

export default Dashboard;
