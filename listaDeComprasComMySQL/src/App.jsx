// App.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddItem from "./components/AddItem";
import Items from "./components/Items";
import "./index.css";
import Input from "./components/Input";
import { useTheme } from "./context/ThemeContext";
import themes from "./themes";

function App() {
  const [items, setItems] = useState([]);
  const [listName, setListName] = useState(localStorage.getItem("listName") || "Minha Lista de Compras");
  const [categorias, setCategorias] = useState([]);
  const { theme, showBackgroundImage } = useTheme();
  const navigate = useNavigate();

  // Buscar os itens da lista
  function fetchItems() {
    fetch("http://localhost:3001/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Erro ao buscar items:", err));
  }

  // Buscar as categorias
  function fetchCategorias() {
    fetch("http://localhost:3001/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => console.error("Erro ao buscar categorias:", err));
  }

  const [listas, setListas] = useState([]);

// Buscar listas do backend
function fetchListas() {
  fetch("http://localhost:3001/listas")
    .then((res) => res.json())
    .then((data) => setListas(data))
    .catch((err) => console.error("Erro ao buscar listas:", err));
}


  // Buscar dados ao iniciar
  useEffect(() => {
    fetchItems();
    fetchCategorias();
      fetchListas(); 
  }, []);

  // Atualizar nome da lista no localStorage
  useEffect(() => {
    localStorage.setItem("listName", listName);
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

  function handlePrint() {
    window.print();
  }

  function handleClearList() {
    if (window.confirm("Tem certeza que deseja apagar todos os itens da lista?")) {
      setItems([]);
      fetch("http://localhost:3001/items", { method: "DELETE" })
        .catch((err) => console.error("Erro ao limpar items no backend:", err));
    }
  }

  function handleItemAdded(novoItem) {
    setItems((prev) => [...prev, novoItem]);
  }

  // Obter nome da categoria pelo ID
  function getCategoriaNome(idCategoria) {
    const categoria = categorias.find((cat) => cat.idCategoria === idCategoria);
    return categoria ? categoria.nome : `Categoria ${idCategoria}`;
  }

  return (
    <div
      className={`min-h-screen w-full flex justify-center p-4 md:p-6`}
      style={{
        backgroundImage: showBackgroundImage ? themes[theme].backgroundImage : "none",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: themes[theme].primaryColor,
        color: themes[theme].textColor,
      }}
    >
      <div className="w-full max-w-lg space-y-4">
        <div className="flex justify-between items-center">
          
          <select
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md shadow-md text-xl md:text-2xl font-bold w-full text-center"
          >
            <option value="" disabled>Selecione uma lista</option>
            {listas.map((lista) => (
              <option key={lista.id} value={lista.nome}>
                {lista.nome}
              </option>
            ))}
          </select>


          <button
            onClick={() => navigate("/settings")}
            className="ml-2 p-2 text-gray-600 hover:text-gray-800"
          >
            ⚙️
          </button>
        </div>

        <AddItem onItemAdded={handleItemAdded} />

        <div className="bg-white p-4 rounded-md shadow-md">
          {Array.from(new Set(items.map((item) => item.idCategoria))).map((idCategoria) => {
            const categoryItems = items.filter((item) => item.idCategoria === idCategoria);
            return categoryItems.length > 0 ? (
              <div key={idCategoria} className="mb-4">
                <h2 className="text-lg font-bold text-gray-700 border-b border-gray-300 pb-2">
                  {getCategoriaNome(idCategoria)}
                </h2>
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
