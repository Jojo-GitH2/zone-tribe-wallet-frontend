import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Alert,
  CircularProgress
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await authContext?.register(email, password);
      navigate("/login"); // Redirect to the login page after successful registration
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}
            disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
}
