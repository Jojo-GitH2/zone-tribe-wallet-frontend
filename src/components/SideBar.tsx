import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

// Import the logo
import ZoneTribeLogo from "../assets/ZoneTribeLogo.png";

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
          width: isOpen ? 200 : 80, // Adjust width for open and collapsed states
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isOpen ? 200 : 80, // Adjust drawer width
            boxSizing: "border-box",
            transition: "width 0.3s ease", // Smooth transition
            height: "100vh", // Full height
            display: "flex",
            flexDirection: "column", // Stack items vertically
            alignItems: "flex-start", // Align items to the left
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
                src={ZoneTribeLogo} // Use the imported logo image
                alt="Logo"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%", // Optional: Make the logo circular
                }}
              />
            </Box>
          )}
          <IconButton
            onClick={toggleSidebar}
            sx={{
              position: "absolute", // Position the toggle button
              top: "50%", // Center vertically relative to the box
              right: "-6px", // Slightly outside the sidebar
              transform: "translateY(-50%)", // Adjust for perfect centering
              backgroundColor: "transparent", // Optional: Add a background for better visibility
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Optional: Add a shadow for a floating effect
                color: "white", // Ensure the icon is visible
                width: 20,
              height: 20,
              "&:hover": {
                backgroundColor: "#f0f0f0", // Optional: Change background on hover
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
              justifyContent: isOpen ? "flex-start" : "center",
              px: isOpen ? 2 : 0, // Add padding when open
            }}
          >
            <ListItemText
              primary="Dashboard"
              sx={{
                textAlign: isOpen ? "left" : "center",
                whiteSpace: "nowrap", // Prevent text wrapping
              }}
            />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
