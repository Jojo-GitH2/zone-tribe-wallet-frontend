import React, { useState, useContext } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { sendFunds } from "../services/walletService";
import { AuthContext } from "../context/authContext";
import { Wallet } from "../types/wallet";
import { NotificationContext } from "../context/notificationContext";

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
  const [amountError, setAmountError] = useState<string | null>(null);
  const [recipientError, setRecipientError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const authContext = useContext(AuthContext);
  const notificationContext = useContext(NotificationContext);

  // Utility function for Ethereum-like address validation
  const isValidAddress = (address: string) =>
    /^0x[a-fA-F0-9]{40}$/.test(address);

  const handleSendFunds = async () => {
    if (!currentWallet) {
      setError("No wallet selected.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    setAmountError(null);
    setRecipientError(null);

    let hasError = false;
    if (!amount) {
      setAmountError("Amount is required.");
      hasError = true;
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setAmountError("Enter a valid amount.");
      hasError = true;
    }

    if (!recipientAddress) {
      setRecipientError("Recipient address is required.");
      hasError = true;
    } else if (!isValidAddress(recipientAddress)) {
      setRecipientError("Invalid wallet address format.");
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return; // Do not proceed or close modal if there are field errors
    }

    try {
      const userId = authContext?.user?.id;
      const token = localStorage.getItem("accessToken");
      if (!userId || !token) {
        throw new Error("User is not authenticated.");
      }

      await sendFunds(
        {
          userId,
          fromAddress: currentWallet.address,
          toAddress: recipientAddress,
          amount: parseFloat(amount),
        },
        token
      );

      notificationContext?.addNotification(
        "Funds sent successfully!",
        "success"
      );

      setSuccess("Transaction successful!");

      setTimeout(() => {
        onClose();
        setSuccess(null);
        setAmount("");
        setRecipientAddress("");
      }, 1000);

      // Add a "refreshing" notification
      const refreshingNotifId = Date.now();
      notificationContext?.addNotification(
        "Refreshing wallet data...",
        "info",
        refreshingNotifId
      );

      setTimeout(() => {
        refreshWallets();
        // Remove the "refreshing" notification after refresh
        notificationContext?.clearNotificationById?.(refreshingNotifId);
      }, 10000);
    } catch (err: any) {
      setError(err.message || "Transaction failed.");
      notificationContext?.addNotification("Failed to send funds.", "error");
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
          error={!!amountError}
          helperText={amountError}
        />
        <TextField
          label="Recipient Address"
          variant="outlined"
          fullWidth
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          sx={{ mb: 2 }}
          error={!!recipientError}
          helperText={recipientError}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            handleSendFunds();
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Send"}
        </Button>
        {/* {refreshing && (
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            <Typography variant="body2" color="textSecondary">
              Refreshing wallet data...
            </Typography>
          </Box>
        )} */}
      </Box>
    </Modal>
  );
};

export default FundWalletModal;
