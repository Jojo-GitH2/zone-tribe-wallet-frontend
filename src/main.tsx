import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme"; // Import the theme from the separate file

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
