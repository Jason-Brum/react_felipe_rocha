// SettingsPage.jsx - Nova página para escolha do tema e/ou para desabilitar a imagem de fundo.

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import themes from '../themes';
import { useNavigate } from 'react-router-dom';
import AddLista from '../components/AddLista';

function SettingsPage() {
  const { theme, changeTheme, showBackgroundImage, toggleBackgroundImage } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Configurações</h1>
      <div className="space-y-4 w-full max-w-md">
        <div>
          <label className="block font-semibold mb-2">Escolha o Tema:</label>
          <select
            value={theme}
            onChange={(e) => changeTheme(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300"
          >
            {Object.keys(themes).map((themeKey) => (
              <option key={themeKey} value={themeKey}>
                {themes[themeKey].name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={!showBackgroundImage}
            onChange={toggleBackgroundImage}
            className="h-4 w-4"
          />
          <label>Desabilitar imagem de fundo</label>
        </div>
        <AddLista idUsuario="123"></AddLista>
        <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 rounded-md font-medium border-2"
        style={{
          backgroundColor: themes[theme].primaryColor,
          color: themes[theme].accentColor,
          borderColor: themes[theme].accentColor,
        }}
      >
        Voltar
      </button>
      </div>
    </div>
  );
}

export default SettingsPage;
