// Página de configurações para seleção de tema e controle da imagem de fundo

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import themes from '../themes';
import { useNavigate } from 'react-router-dom';

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
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
