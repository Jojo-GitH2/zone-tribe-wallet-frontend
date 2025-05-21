import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/SideBar";
import TopBar from "../components/TopBar";
import ActionButtons from "../components/ActionButtons";
import WalletSection from "../components/WalletSection";
import TabsSection from "../components/TabsSection";
import { fetchUserWallets } from "../services/walletService";
import { Wallet } from "../types/wallet";

const Dashboard: React.FC = () => {
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null);

  const handleSidebarToggle = (isOpen: boolean) => {
    setSidebarWidth(isOpen ? 200 : 50); // Adjust width based on collapse state
  };

  const refreshWallets = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    const data = await fetchUserWallets(token);
    setWallets(data);

    setCurrentWallet((prev) => {
      if (prev) {
        // Try to find the updated wallet by id
        const updated: Wallet | undefined = data.find((w: Wallet) => w.id === prev.id);
        return updated || null;
      }
      // If no current wallet, set the first wallet as current
      return data.length > 0 ? data[0] : null;
    });
  };

  useEffect(() => {
    refreshWallets();
  }, []);

  const handleWalletSelect = (wallet: Wallet) => setCurrentWallet(wallet);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar onToggle={handleSidebarToggle} />
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
