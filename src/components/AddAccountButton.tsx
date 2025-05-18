import React, { useState, useContext } from "react";
import {
  Button,
  Box,
  Modal,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { createWallet } from "../services/walletService";
import { AuthContext } from "../context/authContext"; // Import AuthContext to get the userId
import QRCodeModal from "./QRCodeModal";

const AddAccountButton: React.FC = () => {
  const [open, setOpen] = useState(false); // Modal state
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [walletName, setWalletName] = useState(""); // Wallet name state
  const [network, setNetwork] = useState("Sepolia"); // Default network is Sepolia
  const [currency] = useState("SepoliaETH"); // Default currency is SepoliaETH
  const [walletAddress, setWalletAddress] = useState(""); // Wallet address after creation
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const authContext = useContext(AuthContext); // Access the userId from AuthContext

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setWalletName("");
    setWalletAddress("");
    setError("");
  };

  const handleQrModalOpen = (address: string) => {
    setWalletAddress(address);
    setQrModalOpen(true);
  };

  const handleQrModalClose = () => {
    setQrModalOpen(false);
  };

  const handleCreateWallet = async () => {
    setLoading(true);
    setError("");

    try {
      const userId = authContext?.user?.id; // Get the userId from the context
      if (!userId) throw new Error("User not authenticated");

      if (!walletName || !network || !currency) {
        throw new Error("All fields are required");
      }

      const data = await createWallet({
        userId,
        walletName,
        network,
        currency,
      }); // Call the API
      setWalletAddress(data.address); // Set the wallet address from the response
      console.log("Wallet created successfully:", data.address);
      handleClose();
      handleQrModalOpen(data.address);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* "+ Add an account" Button */}
      <Button
        variant="outlined"
        sx={{
          borderRadius: "20px",
          textTransform: "none",
          border: "1px solid white",
          backgroundColor: "transparent",
          color: "white",
          transition: "all 0.7s ease",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "white",
            border: "none",
          },
        }}
        onClick={handleOpen}
      >
        + Add an account
      </Button>

      {/* Modal for Wallet Creation */}
      <Modal open={open} onClose={handleClose}>
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
          <Typography variant="h6" component="h2" gutterBottom>
            Create Wallet
          </Typography>

          {/* Wallet Name Field */}
          <TextField
            label="Wallet Name"
            variant="outlined"
            fullWidth
            value={walletName}
            onChange={(e) => setWalletName(e.target.value)}
            sx={{ mb: 2 }}
            required
          />

          {/* Network Dropdown (Only Sepolia) */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Network</InputLabel>
            <Select
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              label="Network"
              required
            >
              <MenuItem value="Sepolia">Sepolia</MenuItem>
            </Select>
          </FormControl>

          {/* Currency Field (Read-Only, SepoliaETH) */}
          <TextField
            label="Currency"
            variant="outlined"
            fullWidth
            value={currency}
            InputProps={{
              readOnly: true,
            }}
            sx={{ mb: 2 }}
          />

          {/* Display Error Message */}
          {error && (
            <Typography variant="body1" sx={{ mb: 2, color: "red" }}>
              {error}
            </Typography>
          )}

          {/* Create Wallet Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleCreateWallet}
            disabled={loading || !walletName}
            sx={{ mt: 2 }}
          >
            {loading ? "Creating..." : "Create Wallet"}
          </Button>
        </Box>
      </Modal>

      {/* QR Code Modal */}
      <QRCodeModal
        open={qrModalOpen}
        onClose={handleQrModalClose}
        walletAddress={walletAddress}
      />
    </>
  );
};

export default AddAccountButton;
