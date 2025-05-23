// App.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddItem from "./components/AddItem";
import Items from "./components/Items";
import "./index.css";
import Input from "./components/Input";
import { useTheme } from "./context/ThemeContext";
import themes from "./themes";
import { list } from "postcss";
import Items2 from "./components/Items2";

function App() {
  const idUsuario = 1;
  const [items, setItems] = useState([]);
  const [listId, setListId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [listas, setListas] = useState([]);
  const { theme, showBackgroundImage } = useTheme();
  const navigate = useNavigate();


  // Buscar os itens da lista
  function fetchItems(idLista) {
    fetch(`http://localhost:3001/items/lista/${idLista}`)
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


// Buscar listas do backend
function fetchListas() {
fetch(`http://localhost:3001/listas/${idUsuario}`)
    .then((res) => res.json())
    .then((data) => setListas(data))
    .catch((err) => console.error("Erro ao buscar listas:", err));
}

function getIdListaByName(nome) {
  const lista = listas.find((l) => l.nome === nome);
  return lista ? lista.idLista : null;
}


  // Buscar dados ao iniciar
  useEffect(() => {
    fetchCategorias(); 
    fetchListas();
  }, []);

  useEffect(() => {
    console.log("Listas carregadas:", listas);
      }   , [listas]);

  useEffect(() => {
    if (listId) {
      fetchItems(listId);    
    }
  }, [listId]);


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
    console.log("Categorias : ", categorias);
    const categoria = categorias.find((cat) => cat.idCategoria === idCategoria);
    console.log("Categoria : ", categoria);
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
            value={listId}
            onChange={(e) => setListId(e.target.value)}
            className="flex-1 border border-gray-300 px-4 py-2 rounded-md shadow-md text-xl md:text-2xl"
          >
            <option value="">Selecione uma lista</option>
            {listas.map((lista) => (
              <option key={lista.idLista} value={lista.idLista}>
                {lista.nomeDaLista}
              </option>
            ))}
          </select>



          <button
            onClick={() => navigate("/settings")}
            className="ml-2 p-2 text-gray-600 hover:text-gray-800 rounded-xl"
          >
            ⚙️
          </button>
        </div>

        <AddItem onItemAdded={handleItemAdded} 
         idLista={listId}
         />

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

        <div className="bg-white p-4 rounded-md shadow-md">
            <Items2
              items={items}
              categorias={categorias}
              onItemClick={handleItemClick}
              onDeleteItemClick={handleDeleteItemClick} 
            />
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
