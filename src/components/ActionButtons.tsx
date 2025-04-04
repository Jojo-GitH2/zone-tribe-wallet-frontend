import React from "react";
import { Button, Stack, Box } from "@mui/material";

const ActionButtons: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between", // Pushes the buttons to opposite ends
        alignItems: "center", // Aligns buttons vertically
        mt: 8,
      }}
    >
      {/* Grouped Action Buttons */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          sx={{ borderRadius: "20px", textTransform: "capitalize" }} // Rounded edges and title case
        >
          Buy
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: "20px", textTransform: "capitalize" }} // Rounded edges and title case
        >
          Swap
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: "20px", textTransform: "capitalize" }} // Rounded edges and title case
        >
          Bridge
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: "20px", textTransform: "capitalize" }} // Rounded edges and title case
        >
          Send
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: "20px", textTransform: "capitalize" }} // Rounded edges and title case
        >
          Sell
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: "20px", textTransform: "capitalize" }} // Rounded edges and title case
        >
          Stake
        </Button>
      </Box>

      {/* Add an Account Button */}
      <Button
        variant="outlined"
        sx={{
          borderRadius: "20px", // Rounded edges
          textTransform: "none", // Title case
          border: "1px solid white", // White border
          backgroundColor: "transparent", // Transparent background
          color: "white", // White text
          transition: "all 0.7s ease", // Smooth transition for hover effects
          "&:hover": {
            backgroundColor: "primary.main", // Change background color on hover
            color: "white", // Change text color on hover
            border: "none", // Remove border on hover
          },
        }}
      >
        + Add an account
      </Button>
    </Box>
  );
};

export default ActionButtons;
