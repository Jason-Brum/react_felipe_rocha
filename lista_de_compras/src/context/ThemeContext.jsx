// ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import themes from '../themes';

const ThemeContext = createContext();

function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children }) {
  // Estado para armazenar o tema atual
  const [theme, setTheme] = useState(localStorage.getItem('theme') || themes['natureza']);

  useEffect(() => {
    // Salva o tema no localStorage
    localStorage.setItem('theme', theme);

    // Aplica as propriedades do tema atual
    const currentTheme = themes[theme];
    if (currentTheme) {
      document.body.style.backgroundImage = currentTheme.backgroundImage;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundColor = currentTheme.primaryColor;
      document.body.style.color = currentTheme.textColor;
    }
  }, [theme]);

  // Função para trocar o tema
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
