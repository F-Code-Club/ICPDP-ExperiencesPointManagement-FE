import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";

import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./context/auth.context.jsx";
import theme from "./theme.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </ThemeProvider>
);
