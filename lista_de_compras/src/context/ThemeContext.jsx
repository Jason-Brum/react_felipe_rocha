//Contexto para gerenciamento dos temas da aplicação
//O contexto ThemeContext é responsável por gerenciar o tema da aplicação. Ele fornece um hook useTheme para acessar o tema atual e um componente ThemeProvider para envolver a aplicação e fornecer o contexto.

// ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import themes from '../themes';

const ThemeContext = createContext();

function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'natureza');
  const [showBackgroundImage, setShowBackgroundImage] = useState(JSON.parse(localStorage.getItem('showBackgroundImage')) || false);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('showBackgroundImage', JSON.stringify(showBackgroundImage));
    document.body.style.backgroundImage = showBackgroundImage ? themes[theme].backgroundImage : 'none';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundColor = themes[theme].primaryColor;
    document.body.style.color = themes[theme].textColor;
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
export default ThemeProvider;

