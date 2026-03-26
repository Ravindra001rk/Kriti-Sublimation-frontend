import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { UserAuthProvider } from "./context/UserAuthContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserAuthProvider>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </UserAuthProvider>
  </StrictMode>,
);
