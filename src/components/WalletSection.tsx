import React from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { Wallet } from "../types/wallet";

interface WalletSectionProps {
  currentWallet: Wallet | null; // Prop to receive the current wallet
}

const WalletSection: React.FC<WalletSectionProps> = ({ currentWallet }) => {
  if (!currentWallet) {
    return (
      <div>
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h5">Demo Wallet</Typography>
            <Typography variant="h4" color="primary">
              0.00 Demo
            </Typography>
            <Typography variant="body1" color="white" sx={{ mt: 1, color: "text.secondary" }}>
              ($0.00)
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  const equivalentInDollars = (currentWallet.balance * 200).toFixed(2); // Example conversion rate
  const percentageChange = "+5.23%"; // Example percentage change

  return (
    <div>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h5">{currentWallet.walletName}</Typography>
          <Typography variant="h4" color="primary">
            {currentWallet.balance} {currentWallet.currency}
          </Typography>
          <Typography variant="body1" color="white" sx={{ mt: 1, color: "text.secondary" }}>
            (${equivalentInDollars})
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletSection;
