import React from "react";
import { Box, CircularProgress, Typography, Paper } from "@mui/material";

const LoaderOverlay: React.FC<{ message?: string }> = ({ message = "Loading..." }) => (
  <Paper
    elevation={3}
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 2000,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "rgba(44,0,62,0.85)",
      borderRadius: 2,
    }}
  >
    <CircularProgress size={40} sx={{ color: "primary.main", mb: 2 }} />
    <Typography variant="h6" color="white" sx={{ fontWeight: "bold" }}>
      {message}
    </Typography>
  </Paper>
);

export default LoaderOverlay;