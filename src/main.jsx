import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { TeacherAuthProvider } from "./context/TeacherAuthContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TeacherAuthProvider>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </TeacherAuthProvider>
  </StrictMode>,
);
