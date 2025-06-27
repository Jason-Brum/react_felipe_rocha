// src/main.jsx
// Ponto de entrada da aplicação React

import { StrictMode } from "react";
import React from "react";
import ReactDOM from "react-dom/client";


import App from "./App.jsx"; 
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
        {/* App agora encapsula o BrowserRouter e todas as rotas */}
        <App /> 
    </ThemeProvider>
  </StrictMode>
);