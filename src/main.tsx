// Vite entry point — used when running the project outside Figma Make.
// In the Figma Make sandbox, the entry is handled automatically.

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
