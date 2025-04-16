import React, { useState, useContext } from "react";
import { Button, Box, Modal, Typography } from "@mui/material";
import QRCodeModal from "./QRCodeModal";
import AddAccountButton from "./AddAccountButton";
import { Wallet } from "../types/wallet";

interface ActionButtonsProps {
  currentWallet: Wallet | null; // Prop to receive the current wallet
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ currentWallet }) => {
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const handleQrModalOpen = () => {
    if (currentWallet) {
      setQrModalOpen(true); // Open the QRCodeModal
    } else {
      alert("Please select a wallet first."); // Notify the user if no wallet is selected
    }
  };

  const handleQrModalClose = () => {
    setQrModalOpen(false); // Close the QRCodeModal
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 8,
      }}
    >
      {/* Grouped Action Buttons */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          sx={{ borderRadius: "20px", textTransform: "capitalize" }}
          disabled={!currentWallet} // Disable if no wallet
        >
          Send
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: "20px", textTransform: "capitalize" }}
          onClick={handleQrModalOpen}
          disabled={!currentWallet} // Disable if no wallet
        >
          Receive
        </Button>
      </Box>

      {/* Add an Account Button */}
      <AddAccountButton />

      {/* QRCodeModal for the Current Wallet */}
      <QRCodeModal
        open={qrModalOpen}
        onClose={handleQrModalClose}
        walletAddress={currentWallet?.address || ""} // Pass the current wallet's address
      />
    </Box>
  );
};

export default ActionButtons;
