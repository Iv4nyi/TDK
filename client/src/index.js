import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material";
import { orange, blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#b7cfaf",
    },
    secondary: {
      main: "#d1a8e1",
    },
    blue: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
      darker: blue[900],
    },
    pastel: {
      blue: "#aec7e8",
      peach: "#f3a683",
    },
  },
  typography: {
    myVariant: {
      fontSize: "1rem",
      color: orange[500],
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          backgroundColor: "#b7cfaf",
          marginLeft: "5px",
          marginRight: "5px",
          marginBottom: "5px",
          "&:hover": {
            backgroundColor: "#879881",
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
