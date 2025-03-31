//Contexto para gerenciamento dos temas da aplicação
//O contexto ThemeContext é responsável por gerenciar o tema da aplicação. Ele fornece um hook useTheme para acessar o tema atual e um componente ThemeProvider para envolver a aplicação e fornecer o contexto.


import React, { createContext, useContext, useState, useEffect } from 'react';
import themes from '../themes';

const ThemeContext = createContext();

function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'natureza');
  const [showBackgroundImage, setShowBackgroundImage] = useState(JSON.parse(localStorage.getItem('showBackgroundImage')) || true);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('showBackgroundImage', JSON.stringify(showBackgroundImage));
    const selectedTheme = themes[theme];

    // Aplicando as propriedades do tema no documento
    if (showBackgroundImage) {
      document.body.style.backgroundImage = selectedTheme.backgroundImage;
    } else {
      document.body.style.backgroundImage = 'none';
    }
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundColor = selectedTheme.primaryColor;
    document.body.style.color = selectedTheme.textColor;

    // Aplicando as variáveis CSS do tema
    const root = document.documentElement;
    root.style.setProperty('--primary-color', selectedTheme.primaryColor);
    root.style.setProperty('--text-color', selectedTheme.textColor);
    root.style.setProperty('--accent-color', selectedTheme.accentColor);
  }, [theme, showBackgroundImage]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const toggleBackgroundImage = () => {
    setShowBackgroundImage((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, showBackgroundImage, toggleBackgroundImage }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { useTheme, ThemeProvider };
