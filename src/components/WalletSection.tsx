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
        <Typography variant="h6" sx={{ mt: 4 }}>
          Decentralized Accounts
        </Typography>
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h5"> Create a Wallet</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Mock data for equivalent in dollars and percentage change
  const equivalentInDollars = ( 0.01  * 200).toFixed(3); // Example conversion rate
  const percentageChange = "+5.23%"; // Example percentage change
  return (
    <div>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Decentralized Accounts
      </Typography>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h5">{currentWallet.walletName}</Typography>
          <Typography variant="h4" color="primary">
            {currentWallet.balance} {currentWallet.currency}
          </Typography>
          <Typography variant="body1" color="white" sx={{ mt: 1 }}>
            (${equivalentInDollars})
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletSection;
