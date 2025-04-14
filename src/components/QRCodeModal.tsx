import React, { useState } from "react";
import { Modal, Box, Typography, IconButton, Tooltip } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react"; // Import QRCodeCanvas
import ContentCopyIcon from "@mui/icons-material/ContentCopy"; // Copy icon

interface QRCodeModalProps {
  open: boolean;
  onClose: () => void;
  walletAddress: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({
  open,
  onClose,
  walletAddress,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress); // Copy the wallet address to clipboard
    setCopied(true); // Show "Copied!" tooltip
    setTimeout(() => setCopied(false), 3000); // Hide tooltip after 3 seconds
    // console.log("Wallet address copied to clipboard:", walletAddress); // Log the copied address
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40vw",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Wallet QR Code
        </Typography>

        {/* QR Code */}
        <QRCodeCanvas
          value={walletAddress}
          size={200}
          includeMargin
          imageSettings={{
            src: "../assets/WalletLogo.png", // Replace with your logo's path
            height: 40,
            width: 40,
            excavate: true,
          }}
        />

        {/* Wallet Address and Copy Icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Typography variant="body1" sx={{ mr: 1 }}>
            {walletAddress}
          </Typography>
          <Tooltip title={copied ? "Copied!" : "Copy"}>
            <IconButton
              onClick={handleCopyToClipboard}
              sx={{ color: "primary.main" }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Modal>
  );
};

export default QRCodeModal;
