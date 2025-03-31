// App.jsx é o componente principal da aplicação. Ele é responsável por renderizar todos os outros componentes e gerenciar o estado da lista de compras.

// App.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddItem from "./components/AddItem";
import Items from "./components/Items";
import "./index.css";
import { v4 } from 'uuid';
import Input from "./components/Input";
import { useTheme } from "./context/ThemeContext";
import themes from "./themes";
import { SettingsIcon } from "lucide-react";

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')) || []);
  const [listName, setListName] = useState(localStorage.getItem('listName') || "Minha Lista de Compras");
  const { theme, showBackgroundImage } = useTheme();
  const navigate = useNavigate();

  const categories = [
    "Bebidas",
    "Bebidas Alcoólicas",
    "Carnes",
    "Congelados",
    "Enlatados",
    "Higiene Pessoal",
    "Hortifruti",
    "Limpeza",
    "Mercearia",
    "Outros produtos",
    "Pães, massas e biscoitos",
    "Temperos",
  ];

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('listName', listName);
  }, [listName]);

  function handleItemClick(itemId) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  }

  function handleDeleteItemClick(itemId) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }

  function handleAddItem(title, quantity, category) {
    const newItem = {
      id: v4(),
      title,
      quantity,
      category,
      isCompleted: false,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  }

  function handlePrint() {
    window.print();
  }

  function handleClearList() {
    if (window.confirm("Tem certeza que deseja apagar todos os itens da lista?")) {
      setItems([]);
    }
  }

  return (
    <div className={`min-h-screen w-full flex justify-center p-4 md:p-6`} style={{
      backgroundImage: showBackgroundImage ? themes[theme].backgroundImage : 'none',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundColor: themes[theme].primaryColor,
      color: themes[theme].textColor,
    }}>
      <div className="w-full max-w-lg space-y-4">
        <div className="flex justify-between items-center">
          <Input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Digite o nome da sua lista"
            className="border border-gray-300 px-4 py-2 rounded-md shadow-md text-xl md:text-2xl font-bold w-full text-center"
          />
          {/* Botão de Configurações */}
          <button
            onClick={() => navigate("/settings")}
            className="ml-2 p-2 text-gray-600 hover:text-gray-800"
          >
            ⚙️
          </button>
        </div>

        <AddItem onAddItemSubmit={handleAddItem} categories={categories} />

        <div className="bg-white p-4 rounded-md shadow-md">
          {categories.map((category) => {
            const categoryItems = items.filter((item) => item.category === category);
            return categoryItems.length > 0 ? (
              <div key={category} className="mb-4">
                <h2 className="text-lg font-bold text-gray-700 border-b border-gray-300 pb-2">{category}</h2>
                <Items
                  items={categoryItems}
                  onItemClick={handleItemClick}
                  onDeleteItemClick={handleDeleteItemClick}
                />
              </div>
            ) : null;
          })}
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <button
            onClick={handlePrint}
            className="bg-opacity-80 text-white px-4 py-2 rounded-md w-full md:w-1/2 font-medium"
          >
            Imprimir Lista
          </button>
          <button
            onClick={handleClearList}
            className="bg-opacity-80 text-white px-4 py-2 rounded-md w-full md:w-1/2 font-medium"
          >
            Limpar Lista
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;


