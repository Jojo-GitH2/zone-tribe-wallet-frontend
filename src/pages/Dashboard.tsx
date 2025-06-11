import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import { NotificationContext } from "../context/notificationContext";
import Sidebar from "../components/SideBar";
import TopBar from "../components/TopBar";
import ActionButtons from "../components/ActionButtons";
import WalletSection from "../components/WalletSection";
import TabsSection from "../components/TabsSection";
import { fetchUserWallets } from "../services/walletService";
import { Wallet } from "../types/wallet";
import {
  startSignalRConnection,
  stopSignalRConnection,
} from "../services/signalRService";

const Dashboard: React.FC = () => {
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null);
  const notificationContext = useContext(NotificationContext);

  const handleSidebarToggle = (isOpen: boolean) => {
    setSidebarWidth(isOpen ? 200 : 50); // Adjust width based on collapse state
  };

  const refreshWallets = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
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
  };

  useEffect(() => {
    refreshWallets();
  }, []);

  useEffect(() => {
    // Show notification when a transaction is received
    const handleTransactionReceived = () => {
      refreshWallets();
      notificationContext?.addNotification(
        "New transaction received!",
        "success"
      );
    };

    startSignalRConnection(refreshWallets, handleTransactionReceived);
    return () => {
      stopSignalRConnection();
    };
  }, []);

  const handleWalletSelect = (wallet: Wallet) => setCurrentWallet(wallet);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        onToggle={handleSidebarToggle}
        currentWallet={currentWallet}
        refreshWallets={refreshWallets}
      />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <TopBar
          sidebarWidth={sidebarWidth}
          wallets={wallets}
          currentWallet={currentWallet}
          onWalletSelect={handleWalletSelect}
          refreshWallets={refreshWallets}
        />
        <ActionButtons
          currentWallet={currentWallet}
          refreshWallets={refreshWallets}
        />
        <WalletSection currentWallet={currentWallet} />
        <TabsSection currentWallet={currentWallet} />
      </Box>
    </Box>
  );
};

export default Dashboard;
