import React, { useState } from "react";
import { Typography, Card, CardContent, IconButton } from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Wallet } from "../types/wallet";

interface WalletSectionProps {
  currentWallet: Wallet | null; // Prop to receive the current wallet
}

const WalletSection: React.FC<WalletSectionProps> = ({ currentWallet }) => {
  const [showBalance, setShowBalance] = useState(true);

  const toggleVisibility = () => {
    setShowBalance((prev) => !prev);
  };

  if (!currentWallet) {
    return (
      <div>
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h5">Demo Wallet</Typography>
            <Typography variant="h4" color="primary">
              0.00 Demo
            </Typography>
            <Typography variant="body1" color="text.secondary">
              ($0.00)
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  const equivalentInDollars = (currentWallet.balance * 200).toFixed(2); // Example conversion rate

  return (
    <div>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h5">{currentWallet.walletName}</Typography>
          <Typography variant="h4" color="primary">
            {showBalance
              ? `${currentWallet.balance.toFixed(4)} ${currentWallet.currency}`
              : `**** ${currentWallet.currency}`}
            <IconButton onClick={toggleVisibility} sx={{ ml: 1 }}>
              {showBalance ? (
                <VisibilityOffOutlined sx={{ color: "text.secondary" }} />
              ) : (
                <VisibilityOutlined sx={{ color: "text.secondary" }} />
              )}
            </IconButton>
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {showBalance ? `($${equivalentInDollars})` : `($****)`}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletSection;
