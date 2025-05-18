import React from "react";
import { Box, Button, Typography, AppBar, Toolbar, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WalletLogo from "../assets/WalletLogo.png"; // Use your logo

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Top Bar with Login/Signup */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Button
            color="primary"
            variant="outlined"
            sx={{
              mr: 2,
              borderRadius: "20px",
              textTransform: "capitalize",
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
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            color="primary"
            variant="contained"
            sx={{ borderRadius: "20px", textTransform: "capitalize" }}
            onClick={() => navigate("/register")}
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content Card */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
        }}
      >
        <Card
          sx={{
            px: { xs: 3, sm: 6 },
            py: { xs: 4, sm: 6 },
            borderRadius: 4,
            boxShadow: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "background.paper",
            minWidth: { xs: 300, sm: 400 },
            maxWidth: 720,
          }}
        >
          <img
            src={WalletLogo}
            alt="Zone Tribe Wallet Logo"
            style={{ width: 120, height: 120, marginBottom: 24 }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              mb: 2,
              letterSpacing: 2,
              fontSize: { xs: "2rem", sm: "4rem" },
            }}
          >
            Zone Tribe Wallet
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "text.secondary",
              maxWidth: 500,
              mb: 4,
              fontSize: { xs: "1rem", sm: "1rem" },
            }}
          >
            Securely manage your cryptocurrency, view your transaction history,
            and experience seamless wallet operations with Zone Tribe Wallet.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: "20px", px: 5, textTransform: "capitalize" }}
            onClick={() => navigate("/register")}
          >
            Get Started
          </Button>
        </Card>
      </Box>
    </Box>
  );
};

export default Landing;