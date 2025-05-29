// App.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddItem from "./components/AddItem";
import ListItems from "./components/listItems";
import "./index.css";
import { useTheme } from "./context/ThemeContext";
import themes from "./themes";

function App() {
  const idUsuario = 1;
  const [listId, setListId] = useState("");
  const [listas, setListas] = useState([]);
  const [triggerUpdate, setTriggerUpdate] = useState(0); // Para forçar atualização de listas
  const { theme, showBackgroundImage } = useTheme();
  const navigate = useNavigate();
  

// Buscar listas do backend
function fetchListas() {
fetch(`http://localhost:3001/listas/${idUsuario}`)
    .then((res) => res.json())
    .then((data) => setListas(data))
    .catch((err) => console.error("Erro ao buscar listas:", err));
}

  // Buscar dados ao iniciar
  useEffect(() => { 
    fetchListas();
  }, []);

  function handlePrint() {
    window.print();
  }

  function handleClearList() {
    if (window.confirm("Tem certeza que deseja apagar todos os itens da lista?")) {
      fetch(`http://localhost:3001/items/lista/${listId}`, { method: "DELETE" })
      .then(() => setListId(listId))
        .catch((err) => console.error("Erro ao limpar items no backend:", err));
    }
  }

  function handleItemAdded(novoItem) {
    setListId(novoItem.idLista);
    setTriggerUpdate((prev) => prev + 1); // Força atualização de listas
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
          
               <ListItems idLista={listId} triggerUpdateChange={triggerUpdate}/>

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
