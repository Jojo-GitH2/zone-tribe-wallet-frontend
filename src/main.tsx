import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const theme = createTheme({
  palette: {
    background: {
      default: "#2c003e", // Primary background
      paper: "#1a001f", // Secondary background (e.g., cards)
    },
    text: {
      primary: "#eaeaea", // Main text color
    },
    primary: {
      main: "#6a0dad", // Accent color for buttons, links, etc.
    },
    secondary: {
      main: "#9b59b6", // Hover or focus color
    },
  },
  typography: {
    allVariants: {
      color: "#eaeaea", // Default text color
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: "#2c003e", // Fallback background color
            color: "#eaeaea", // Fallback text color
          },
        }}
      />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
