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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Import dropdown icon

interface Wallet {
  id: string;
  walletName: string;
  address: string;
  balance: number;
}

interface WalletDropdownProps {
  onAddAccount: () => void; // Callback for adding a new account
}

const WalletDropdown: React.FC<WalletDropdownProps> = ({ onAddAccount }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    // Simulate fetching wallets from the backend
    const fetchWallets = async () => {
      const data: Wallet[] = [
        {
          id: "1",
          walletName: "Main Wallet",
          address: "0x1234567890abcdef1234567890abcdef12345678",
          balance: 10.5,
        },
        {
          id: "2",
          walletName: "Savings Wallet",
          address: "0xabcdef1234567890abcdef1234567890abcdef12",
          balance: 5.0,
        },
      ];
      setWallets(data);
      if (data.length > 0) {
        setCurrentWallet(data[0]); // Set the first wallet as the current wallet
      }
    };

    fetchWallets();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleWalletSelect = (wallet: Wallet) => {
    setCurrentWallet(wallet);
    handleMenuClose();
  };

  return (
    <Box>
      {currentWallet ? (
        <Button
          onClick={handleMenuOpen}
          endIcon={<ArrowDropDownIcon />} // Add dropdown icon beside the wallet name
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            color: "white",
            fontSize: "1rem",
            minWidth: "200px",
            // display: "flex",
            //   justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {currentWallet.walletName}
        </Button>
      ) : (
        <Button
          onClick={onAddAccount}
          sx={{ textTransform: "none", fontWeight: "bold", color: "white" }}
        >
          + Add an account
        </Button>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            width: "25vw", // Set the width of the dropdown
            bgcolor: "background.paper",
          },
        }}
        anchorOrigin={{
          vertical: "bottom", // Align the dropdown to the bottom of the button
          horizontal: "center", // Center the dropdown horizontally
        }}
        transformOrigin={{
          vertical: "top", // Align the dropdown's top with the button's bottom
          horizontal: "center", // Center the dropdown horizontally
        }}
      >
        {wallets.length > 0 ? (
          <>
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
                    sx: { color: "white" }, // Make the wallet name white
                  }}
                  secondaryTypographyProps={{
                    sx: { color: "rgba(255, 255, 255, 0.7)" }, // Make the wallet address dim
                  }}
                />
                <Typography variant="body2" sx={{ ml: 2, color: "white" }}>
                  {wallet.balance} ETH
                </Typography>
              </MenuItem>
            ))}
            <Divider />
            <MenuItem onClick={onAddAccount}>
              <Typography color="primary">+ Add an account</Typography>
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={onAddAccount}>
            <Typography color="primary">+ Add an account</Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default WalletDropdown;
