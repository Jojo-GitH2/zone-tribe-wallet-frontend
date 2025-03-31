import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          backgroundColor: "background.paper",
          color: "text.primary",
          mt: 8,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <TextField fullWidth label="Email" margin="normal" />
        <TextField fullWidth label="Password" type="password" margin="normal" />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          margin="normal"
        />
        <Button fullWidth variant="contained" sx={{ mt: 2 }}>
          Sign Up
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Link to="/">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
}
