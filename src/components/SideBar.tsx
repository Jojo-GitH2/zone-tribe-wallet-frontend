import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  DashboardOutlined as DashboardIcon,
} from "@mui/icons-material";

// Import the logo
import ZoneTribeLogo from "../assets/ZoneTribeLogo.png";
import WalletLogo from "../assets/WalletLogo.png"; // Import the wallet logo

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar is open by default

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: isOpen ? 200 : 50, // Adjust width for open and collapsed states
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isOpen ? 200 : 50, // Adjust drawer width
            boxSizing: "border-box",
            transition: "width 0.3s ease", // Smooth transition
            height: "100vh", // Full height
            display: "flex",
            flexDirection: "column", // Stack items vertically
            alignItems: "flex-start", // Align items to the left
            overflow: "hidden", // Prevent overflow
            borderRight: "1px solid rgba(255, 255, 255, 0.2)", // Add a faint right border
          },
        }}
      >
        {/* App Name or Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isOpen ? "space-between" : "center",
            width: "100%",
            p: 2,
            position: "relative", // Allows absolute positioning of the toggle button
          }}
        >
          {isOpen ? (
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Zone Tribe Wallet
            </Typography>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <img
                src={WalletLogo} // Use the imported logo image
                alt="Logo"
                style={{
                  width: 60,
                  height: 60,
                  //   borderRadius: "50%", // Optional: Make the logo circular
                }}
              />
            </Box>
          )}
          <IconButton
            onClick={toggleSidebar}
            sx={{
              position: "absolute", // Position the toggle button
              top: "50%", // Center vertically relative to the box
              right: "-12px", // Slightly outside the sidebar
              transform: "translateY(-50%)", // Adjust for perfect centering
              backgroundColor: "transparent", // Transparent background
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Add a shadow for better visibility
              color: "white", // Ensure the icon is visible
              width: 30, // Adjust the size of the button
              height: 30, // Adjust the size of the button
              opacity: 0, // Initially invisible
              transition: "opacity 0.3s ease", // Smooth transition for opacity
              pointerEvents: "none", // Prevent interaction when invisible
              ".MuiDrawer-root:hover &": {
                opacity: 0.7, // Translucent when hovering over the sidebar
                pointerEvents: "auto", // Enable interaction when visible
              },
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)", // Light background on hover
                //     opacity: 1, // Fully opaque when hovering over the button
                //     pointerEvents: "auto", // Ensure interaction is enabled
              },
            }}
          >
            {isOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>

        {/* Sidebar Items */}
        <List sx={{ flexGrow: 1, mt: 4, width: "100%" }}>
          <ListItem
            component={"a"}
            href="/dashboard"
            sx={{
              justifyContent: isOpen ? "flex-start" : "center", // Align items based on sidebar state
              px: isOpen ? 2 : 0, // Add padding when open
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0, // Remove default spacing
                justifyContent: "center", // Center the icon
                color: "white", // Set icon color to white
              }}
            >
              <DashboardIcon />
            </ListItemIcon>
            {isOpen && (
              <ListItemText
                primary="Dashboard"
                sx={{
                  textAlign: "left",
                  marginLeft: 1, // Add margin to the left of the text
                  whiteSpace: "nowrap", // Prevent text wrapping
                  color: "white", // Set text color to white
                }}
              />
            )}
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
