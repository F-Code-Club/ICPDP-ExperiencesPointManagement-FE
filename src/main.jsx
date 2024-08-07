import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";

import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./context/auth.context.jsx";
import theme from "./theme.js";
import "./index.css";
import Toast from "./components/Toast/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <App />
      <Toast />
    </AuthProvider>
  </ThemeProvider>
);
