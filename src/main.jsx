import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./utils/AuthProvider";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <App />
        <Analytics />
      </AuthProvider>
    </HashRouter>
  </StrictMode>
);
