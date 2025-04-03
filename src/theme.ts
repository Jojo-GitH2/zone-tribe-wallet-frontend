import { createTheme } from "@mui/material/styles";

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

export default theme;