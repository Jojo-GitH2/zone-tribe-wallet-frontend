import React, { useState } from "react";
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
import AddAccountButton from "./AddAccountButton"; // Import the reusable component
import { Wallet } from "../types/wallet"; // Import the Wallet type

interface WalletDropdownProps {
  wallets: Wallet[];
  currentWallet: Wallet | null;
  onWalletSelect: (wallet: Wallet) => void;
  refreshWallets: () => void;
}

const WalletDropdown: React.FC<WalletDropdownProps> = ({
  wallets,
  currentWallet,
  onWalletSelect,
  refreshWallets,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    // Optionally call refreshWallets() here if you want to refresh on open
    // refreshWallets();
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleWalletSelect = (wallet: Wallet) => {
    onWalletSelect(wallet);
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
        {wallets.length > 0 ? (
          wallets.map((wallet) => (
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
              />
              <Typography variant="body2" sx={{ ml: 2 }}>
                {wallet.balance} {wallet.currency}
              </Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <Typography>No wallets found.</Typography>
          </MenuItem>
        )}
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        >
          <AddAccountButton />
        </Box>
      </Menu>
    </Box>
  );
};

export default WalletDropdown;
