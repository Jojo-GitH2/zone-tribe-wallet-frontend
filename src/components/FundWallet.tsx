import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Fade,
} from "@mui/material";

const FundWallet: React.FC = () => {
  const [amount, setAmount] = useState("");

  const handleFundWallet = () => {
    console.log(`Funding wallet with ${amount}`);
  };

  return (
    <Fade in={true} timeout={1000}>
      <Card sx={{ backgroundColor: "background.paper", boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Fund Wallet
          </Typography>
          <TextField
            fullWidth
            label="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleFundWallet}
            sx={{ mt: 2 }}
          >
            Fund Wallet
          </Button>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default FundWallet;
