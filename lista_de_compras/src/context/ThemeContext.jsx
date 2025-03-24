//Contexto para gerenciamento dos temas da aplicação
//O contexto ThemeContext é responsável por gerenciar o tema da aplicação. Ele fornece um hook useTheme para acessar o tema atual e um componente ThemeProvider para envolver a aplicação e fornecer o contexto.

import React, { createContext, useContext, useState, useEffect } from "react";
import themes from "../themes";

const ThemeContext = createContext();

function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "natureza");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const selectedTheme = themes[theme];

    // Aplicando as propriedades do tema no documento
    document.body.style.backgroundImage = selectedTheme.backgroundImage;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundColor = selectedTheme.primaryColor;
    document.body.style.color = selectedTheme.textColor;

    // Aplicando a cor do texto e da borda nos inputs e botões
    const root = document.documentElement;
    root.style.setProperty("--primary-color", selectedTheme.primaryColor);
    root.style.setProperty("--text-color", selectedTheme.textColor);
    root.style.setProperty("--accent-color", selectedTheme.accentColor);
  }, [theme]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { useTheme, ThemeProvider };
