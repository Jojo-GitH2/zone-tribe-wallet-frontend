import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import {
  NotificationsOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material"; // Use outlined icons
import WalletDropdown from "./WalletDropdown";
import { AuthContext } from "../context/authContext";

interface TopBarProps {
  sidebarWidth: number; // Sidebar width to adjust the TopBar width dynamically
  onWalletSelect: (wallet: any) => void; // Optional callback for wallet selection
}

const TopBar: React.FC<TopBarProps> = ({ sidebarWidth, onWalletSelect }) => {
  const authContext = useContext(AuthContext); // Access the userId from AuthContext
  const userId = authContext?.user?.id; // Get the userId from the context
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddAccount = () => {
    // Logic to add a new account
    console.log("Add Account clicked");
  };

  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        zIndex: 1201,
        width: `calc(100% - ${sidebarWidth}px)`, // Adjust width dynamically
        ml: `${sidebarWidth}px`, // Ensure it aligns with the sidebar
        bgcolor: "background.default", // Set background color
        color: "white", // Set text and icon color to white
        boxShadow: "none", // Remove default AppBar shadow
        transition: "width 0.3s ease, margin-left 0.3s ease", // Smooth transition for width and margin
        borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          {userId && (
            <WalletDropdown onAddAccount={handleAddAccount} onWalletSelect = {onWalletSelect} />
          )}
        </Box>

        {/* Right: Notification and Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            sx={{
              color: "white", // Set icon color to white
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.1)", // Add hover effect
              },
            }}
          >
            <NotificationsOutlined />
          </IconButton>
          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{
              color: "white", // Set icon color to white
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.1)", // Add hover effect
              },
            }}
          >
            <AccountCircleOutlined />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Accounts</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Log out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
