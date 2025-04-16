import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/SideBar";
import TopBar from "../components/TopBar";
import ActionButtons from "../components/ActionButtons";
import WalletSection from "../components/WalletSection";
import TabsSection from "../components/TabsSection";
import { Wallet } from "../types/wallet";

const Dashboard: React.FC = () => {
  const [sidebarWidth, setSidebarWidth] = useState(200); // Default sidebar width
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null); // State to hold the current wallet

  const handleSidebarToggle = (isOpen: boolean) => {
    setSidebarWidth(isOpen ? 200 : 50); // Adjust width based on collapse state
  };

  const handleWalletSelect = (wallet: Wallet) => {
    setCurrentWallet(wallet); // Update the current wallet state
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Pass the toggle handler to the Sidebar */}
      <Sidebar onToggle={handleSidebarToggle} />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Pass the dynamic sidebarWidth to the TopBar */}
        <TopBar
          sidebarWidth={sidebarWidth}
          onWalletSelect={handleWalletSelect}
        />
        <ActionButtons currentWallet={currentWallet} />
        <WalletSection currentWallet={currentWallet} />
        <TabsSection />
      </Box>
    </Box>
  );
};

export default Dashboard;
