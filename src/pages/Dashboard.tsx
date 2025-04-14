import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/SideBar";
import TopBar from "../components/TopBar";
import ActionButtons from "../components/ActionButtons";
import WalletSection from "../components/WalletSection";
import TabsSection from "../components/TabsSection";

const Dashboard: React.FC = () => {
  const [sidebarWidth, setSidebarWidth] = useState(200); // Default sidebar width

  const handleSidebarToggle = (isOpen: boolean) => {
    setSidebarWidth(isOpen ? 200 : 50); // Adjust width based on collapse state
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Pass the toggle handler to the Sidebar */}
      <Sidebar onToggle={handleSidebarToggle} />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Pass the dynamic sidebarWidth to the TopBar */}
        <TopBar sidebarWidth={sidebarWidth} />
        <ActionButtons />
        <WalletSection />
        <TabsSection />
      </Box>
    </Box>
  );
};

export default Dashboard;
