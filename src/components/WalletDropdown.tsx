import React, { useState, useEffect } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  ListItemText,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { fetchUserWallets } from "../services/walletService"; // Import the API service
import AddAccountButton from "./AddAccountButton"; // Import the reusable component
import { Wallet } from "../types/wallet"; // Import the Wallet type

interface WalletDropdownProps {
  onAddAccount: () => void; // Callback for adding a new account
  onWalletSelect: (wallet: Wallet) => void; // Optional callback for wallet selection
}

const WalletDropdown: React.FC<WalletDropdownProps> = ({
  onAddAccount,
  onWalletSelect,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reusable fetchWallets function
  const fetchWallets = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await fetchUserWallets(token); // Fetch wallets from the backend
      const sortedWallets = data.sort((a: Wallet, b: Wallet) =>
        a.walletName.localeCompare(b.walletName)
      ); // Sort wallets alphabetically by walletName
      setWallets(sortedWallets);

      if (sortedWallets.length > 0 && !currentWallet) {
        const firstWallet = sortedWallets[0];
        setCurrentWallet(firstWallet); // Set the first wallet as the current wallet
        onWalletSelect(firstWallet); // Notify the parent component
      }
    } catch (err) {
      setError("Failed to fetch wallets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch wallets on component mount
  useEffect(() => {
    fetchWallets();
  }, []);

  // Handle dropdown open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    fetchWallets(); // Re-fetch wallets when the dropdown is opened
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleWalletSelect = (wallet: Wallet) => {
    setCurrentWallet(wallet);
    onWalletSelect(wallet); // Notify the parent component
    handleMenuClose();
  };

  return (
    <Box>
      {currentWallet ? (
        <Button
          onClick={handleMenuOpen}
          endIcon={<ArrowDropDownIcon />}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            color: "white",
            fontSize: "1rem",
            minWidth: "200px",
            alignItems: "center",
          }}
        >
          {currentWallet.walletName}
        </Button>
      ) : (
        <Button
          endIcon={<ArrowDropDownIcon />}
          onClick={handleMenuOpen}
          sx={{ textTransform: "none", fontWeight: "bold", color: "white" }}
        >
          Select Wallet
        </Button>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            width: "30vw",
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {loading ? (
          <MenuItem>
            <Typography>Loading...</Typography>
          </MenuItem>
        ) : error ? (
          <MenuItem>
            <Typography color="error">{error}</Typography>
          </MenuItem>
        ) : wallets.length > 0 ? (
          <>
            {/* Scrollable Wallet List */}
            <Box
              sx={{
                maxHeight: "40vh", // Limit the height of the wallet list
                overflowY: "auto", // Enable scrolling for the wallet list
              }}
            >
              {wallets.map((wallet) => (
                <MenuItem
                  key={wallet.id}
                  onClick={() => handleWalletSelect(wallet)}
                >
                  <ListItemText
                    primary={wallet.walletName}
                    secondary={`${wallet.address.slice(
                      0,
                      6
                    )}...${wallet.address.slice(-4)}`}
                    primaryTypographyProps={{
                      sx: { color: "white" },
                    }}
                    secondaryTypographyProps={{
                      sx: { color: "rgba(255, 255, 255, 0.7)" },
                    }}
                  />
                  <Typography variant="body2" sx={{ ml: 2, color: "white" }}>
                    {wallet.balance} {wallet.currency}
                  </Typography>
                </MenuItem>
              ))}
            </Box>

            {/* Fixed "+ Add an account" Button */}
            <Divider />
            <Box
              sx={{
                position: "sticky",
                bottom: 0,
                bgcolor: "background.paper",
                zIndex: 1,
                display: "flex",
                justifyContent: "center", // Center the button horizontally
                p: 2, // Add padding for spacing
              }}
            >
              <AddAccountButton />
            </Box>
          </>
        ) : (
          <MenuItem
            sx={{
              position: "sticky",
              bottom: 0,
              bgcolor: "background.paper",
              zIndex: 1,
              display: "flex",
              justifyContent: "center", // Center the button horizontally
              p: 2, // Add padding for spacing
            }}
          >
            <AddAccountButton />
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default WalletDropdown;
