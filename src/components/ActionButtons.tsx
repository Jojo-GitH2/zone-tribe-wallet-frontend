import React from "react";
import { Button, Stack, Box } from "@mui/material";

const ActionButtons: React.FC = () => {
  return (
    <Stack
      direction="row"
      spacing={2} // Adds spacing between buttons
      sx={{ mt: 8 }}
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
        variant="contained"
        sx={{
          borderRadius: "20px", // Rounded edges
          textTransform: "capitalize", // Title case
          marginRight: "auto", // Pushes this button to the extreme right
          
        }}
      >
        + Add an Account
      </Button>
    </Stack>
  );
};

export default ActionButtons;
