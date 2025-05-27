
// Items.jsx
import { TrashIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Button from "./Button";
import { useState, useEffect } from "react";


function ListItems({idLista}) {
  const { theme } = useTheme();
  const [items, setItems] = useState([]);



  function fetchItems(idLista) {
    fetch(`http://localhost:3001/items/lista/${idLista}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Erro ao buscar items:", err));
  }

  function onDeleteItemClick(itemId) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }

  function onItemClick(itemId) {
    setItems((prevItems) => prevItems.map((item) => item.idItem === itemId ? { ...item, isCompleted: !item.isCompleted } : item))
  }

  useEffect(() => {
    if (idLista) {
      fetchItems(idLista);    
    }
  }, [idLista]);


  return (
    <div>
      <ul className="space-y-2 p-2 rounded-md shadow-md" style={{ backgroundColor: theme.primaryColor }}>
        { items && items.map((item) => (
          <li key={item.idItem} className="flex gap-2 items-center">
            <button
              onClick={() => onItemClick(item.idItem)}
              className={`w-full text-left p-1 rounded-md ${
                item.isCompleted ? "line-through" : ""
              } text-white`}
              style={{ backgroundColor: theme.accentColor }}
            >
              {item.dsCategoria} - {item.nome} - {item.quantidade} und
            </button>
            <Button onClick={() => onDeleteItemClick(item.idItem)}
              className="p-1 rounded-md"
              style={{ backgroundColor: theme.accentColor }}
              >
              <TrashIcon size={16}/>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListItems;
