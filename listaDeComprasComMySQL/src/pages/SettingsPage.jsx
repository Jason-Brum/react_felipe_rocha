// src/pages/SettingsPage.jsx - Nova página para escolha do tema e/ou para desabilitar a imagem de fundo.

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import themes from '../themes';
import { useNavigate } from 'react-router-dom';
import AddLista from '../components/AddLista';
import { useAuth } from '../context/AuthContext'; 

function SettingsPage() {
  const { theme, changeTheme, showBackgroundImage, toggleBackgroundImage } = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const idUsuarioAutenticado = user ? user.user.idUsuario : null;
  const userToken = user ? user.token : null;

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ 
        backgroundImage: showBackgroundImage ? themes[theme].backgroundImage : "none",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: themes[theme].primaryColor, 
        color: themes[theme].textColor 
      }}
    >
      <h1 className="text-3xl font-bold mb-6">Configurações</h1>
      <div 
        className="space-y-4 w-full max-w-md p-6 rounded-lg shadow-xl" // Adicionado padding, rounded e shadow ao container do formulário
        style={{ backgroundColor: themes[theme].primaryColor }} // Usar primaryColor para o fundo do container interno
      >
        <div>
          <label className="block font-semibold mb-2">Escolha o Tema:</label>
          <div className="relative">
            <select
              value={theme}
              onChange={(e) => changeTheme(e.target.value)}
              // Aplicando cores do tema ao select do tema
              className="w-full p-2 rounded-md border appearance-none pr-8" 
              style={{
                  backgroundColor: themes[theme].selectBackgroundColor,
                  color: themes[theme].selectTextColor,
                  borderColor: themes[theme].accentColor, // Borda com a cor de destaque
              }}
            >
              {Object.keys(themes).map((themeKey) => (
                <option key={themeKey} value={themeKey}>
                  {themes[themeKey].name}
                </option>
              ))}
            </select>
            {/* Ícone de seta customizado para o select */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
                 style={{ color: themes[theme].selectTextColor }} // Cor do ícone da seta
            >
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.091 6.919 4.677 8.333z"/></svg>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={!showBackgroundImage}
            onChange={toggleBackgroundImage}
            className="h-4 w-4"
            // Adicionado estilo para a caixa de seleção para combinar com o tema
            style={{ borderColor: themes[theme].accentColor, backgroundColor: themes[theme].selectBackgroundColor }}
          />
          <label style={{ color: themes[theme].textColor }}>Desabilitar imagem de fundo</label>
        </div>
        {/* Passar idUsuarioAutenticado e userToken para AddLista */}
        <AddLista 
            idUsuario={idUsuarioAutenticado} 
            userToken={userToken}
        />
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-md font-medium border-2"
          style={{
            backgroundColor: themes[theme].accentColor, // Botão Voltar usa accentColor
            color: themes[theme].textColor,
            borderColor: themes[theme].textColor, // Borda com a cor do texto para contraste
          }}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;