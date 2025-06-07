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
  Menu,
  MenuItem,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  DashboardOutlined as DashboardIcon,
  SwapHoriz as SwapHorizIcon,
  ArrowRight as ArrowRightIcon,
} from "@mui/icons-material";

// Import the logo
import WalletLogo from "../assets/WalletLogo.png"; // Import the wallet logo
import FundWalletModal from "./FundWalletModal"; // Import your modal
import QRCodeModal from "./QRCodeModal"; // <-- Add this import
import { Link } from "react-router-dom";

interface SidebarProps {
  onToggle: (isOpen: boolean) => void; // Callback to notify parent about collapse state
  currentWallet: any; // <-- add currentWallet prop type
  refreshWallets: () => void; // <-- add refreshWallets prop type
}

const Sidebar: React.FC<SidebarProps> = ({
  onToggle,
  currentWallet,
  refreshWallets,
}) => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar is open by default
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [fundModalOpen, setFundModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false); // <-- Add state for QR modal

  const toggleSidebar = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggle?.(newIsOpen); // Safely call onToggle
  };

  const handleMoveCryptoClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleFundWallet = () => {
    setFundModalOpen(true);
    setAnchorEl(null);
  };

  const handleReceive = () => {
    if (currentWallet) {
      setQrModalOpen(true);
    } else {
      alert("Please select a wallet first.");
    }
    setAnchorEl(null);
  };

  const handleFundWalletModalClose = () => {
    setFundModalOpen(false);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: isOpen ? 200 : 50,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isOpen ? 200 : 50,
            boxSizing: "border-box",
            transition: "width 0.3s ease",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            overflow: "hidden",
            borderRight: "0.5px solid rgba(255, 255, 255, 0.2)",
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
            position: "relative",
            transition: "all 0.3s ease",
          }}
        >
          {isOpen ? (
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                transition: "opacity 0.3s ease",
                opacity: isOpen ? 1 : 0,
              }}
            >
              Zone Tribe Wallet
            </Typography>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                transition: "all 0.3s ease",
              }}
            >
              <img
                src={WalletLogo}
                alt="Logo"
                style={{
                  width: 60,
                  height: 60,
                  transition: "all 0.3s ease",
                }}
              />
            </Box>
          )}
          <IconButton
            onClick={toggleSidebar}
            sx={{
              position: "absolute",
              top: "50%",
              right: "-12px",
              transform: "translateY(-50%)",
              backgroundColor: "transparent",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              color: "white",
              width: 30,
              height: 30,
              opacity: 0,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
              ".MuiDrawer-root:hover &": {
                opacity: 0.7,
                pointerEvents: "auto",
              },
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            {isOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>

        {/* Sidebar Items */}
        <List
          sx={{
            flexGrow: 1,
            mt: 4,
            width: "100%",
            transition: "all 0.3s ease",
          }}
        >
          <ListItem
            component={Link}
            to="/dashboard"
            sx={{
              justifyContent: isOpen ? "flex-start" : "center",
              px: isOpen ? 2 : 0,
              transition: "all 0.3s ease",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
                color: "white",
                transition: "all 0.3s ease",
              }}
            >
              <DashboardIcon />
            </ListItemIcon>
            {isOpen && (
              <ListItemText
                primary="Dashboard"
                sx={{
                  textAlign: "left",
                  marginLeft: 1,
                  whiteSpace: "nowrap",
                  color: "white",
                  transition: "opacity 0.3s ease",
                  opacity: isOpen ? 1 : 0,
                }}
              />
            )}
          </ListItem>

          {/* Move Crypto Dropdown */}
          <ListItem
            component="button"
            onClick={handleMoveCryptoClick}
            sx={{
              justifyContent: isOpen ? "flex-start" : "center",
              px: isOpen ? 2 : 0,
              transition: "all 0.3s ease",
              mt: 1,
              color: "white",
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
                color: "white",
                transition: "all 0.3s ease",
              }}
            >
              <SwapHorizIcon />
            </ListItemIcon>
            {isOpen && (
              <ListItemText
                primary="Move Crypto"
                sx={{
                  textAlign: "left",
                  marginLeft: 1,
                  whiteSpace: "nowrap",
                  color: "white",
                  transition: "opacity 0.3s ease",
                  opacity: isOpen ? 1 : 0,
                }}
              />
            )}
            {isOpen && <ArrowRightIcon sx={{ ml: "auto", color: "white" }} />}
          </ListItem>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleDropdownClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            PaperProps={{
              sx: {
                mt: 1,
                ml: 1,
                zIndex: 1400, // Ensure it floats above other content
              },
            }}
          >
            <MenuItem onClick={handleFundWallet} disabled={!currentWallet}>
              Send
            </MenuItem>
            <MenuItem onClick={handleReceive} disabled={!currentWallet}>
              Receive
            </MenuItem>
          </Menu>
        </List>
      </Drawer>
      {/* Floating Modal */}
      <FundWalletModal
        open={fundModalOpen}
        onClose={handleFundWalletModalClose}
        currentWallet={currentWallet} // <-- pass the current wallet object
        refreshWallets={refreshWallets} // <-- pass the refresh function
      />
      <QRCodeModal
        open={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        walletAddress={currentWallet?.address || ""}
      />
    </Box>
  );
};

export default Sidebar;
