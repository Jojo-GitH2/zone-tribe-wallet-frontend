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
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90vw", sm: 400, md: 500 }, // Responsive width
          maxWidth: "95vw",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Wallet Address
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <QRCodeCanvas
            value={walletAddress}
            size={window.innerWidth < 400 ? 150 : 200} // Responsive QR size
            includeMargin
            imageSettings={{
              src: "../assets/WalletLogo.png",
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
            flexWrap: "wrap",
            wordBreak: "break-all", // Prevent overflow
          }}
        >
          <Typography variant="body1" sx={{ mr: 1, wordBreak: "break-all" }}>
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
