import React, { useState, useContext } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { sendFunds } from "../services/walletService"; // Backend API call
import { AuthContext } from "../context/authContext"; // Assuming you have an AuthContext for user info
import { Wallet } from "../types/wallet";

interface FundWalletModalProps {
  open: boolean;
  onClose: () => void;
  currentWallet: Wallet | null; // Current wallet to send funds from
  refreshWallets: () => void; // Refresh wallets after sending funds
}

const FundWalletModal: React.FC<FundWalletModalProps> = ({
  open,
  onClose,
  currentWallet,
  refreshWallets,
}) => {
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const authContext = useContext(AuthContext); // Access userId from AuthContext

  const handleSendFunds = async () => {
    if (!currentWallet) {
      setError("No wallet selected.");
      return;
    }

    if (!amount || !recipientAddress) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const userId = authContext?.user?.id; // Get the userId from the context
      const token = localStorage.getItem("accessToken"); // Get the token from localStorage

      if (!userId || !token) {
        throw new Error("User is not authenticated.");
      }

      console.log("currentWallet:", currentWallet);

      const response = await sendFunds(
        {
          userId,
          fromAddress: currentWallet.address,
          toAddress: recipientAddress,
          amount: parseFloat(amount),
        },
        token
      );

      setSuccess("Transaction successful!");
      setAmount(""); // Clear amount field
      setRecipientAddress(""); // Clear recipient address field
      console.log("Transaction response:", response);
      refreshWallets();
    } catch (err: any) {
      setError(err.message || "Transaction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Send Funds
        </Typography>
        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
            {success}
          </Typography>
        )}
        <TextField
          label="Amount"
          variant="outlined"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Recipient Address"
          variant="outlined"
          fullWidth
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleSendFunds}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Send"}
        </Button>
      </Box>
    </Modal>
  );
};

export default FundWalletModal;
