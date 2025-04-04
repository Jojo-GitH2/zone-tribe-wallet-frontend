import React from "react";
import { Typography, Card, CardContent } from "@mui/material";

const WalletSection: React.FC = () => {
  return (
    <div>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Decentralized Accounts
      </Typography>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h5">Wallet Balance</Typography>
          <Typography variant="h4" color="primary">
            500 ETH
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletSection;
