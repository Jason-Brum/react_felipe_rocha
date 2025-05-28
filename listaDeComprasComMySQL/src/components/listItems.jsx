import { TrashIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Button from "./Button";
import { useState, useEffect, useMemo } from "react"; 

function ListItems({ idLista }) {
  const { theme } = useTheme();
  const [items, setItems] = useState([]);

  function fetchItems(atualIdLista) { 
    fetch(`http://localhost:3001/items/lista/${atualIdLista}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Erro ao buscar items:", err));
  }

  function onDeleteItemClick(itemId) {
    fetch(`http://localhost:3001/items/${itemId}`, {
      method: "DELETE",
    })
    .then(response => {
      if (response.ok) {
        setItems((prevItems) => prevItems.filter((item) => item.idItem !== itemId));
        console.log("Item deletado com sucesso no backend e frontend:", itemId);
      } else {
        console.error("Erro ao deletar item no backend:", response.statusText);
        alert("Falha ao deletar o item no servidor."); 
      }
    })
    .catch(err => {
      console.error("Erro na requisição para deletar item:", err);
      alert("Erro de rede ao tentar deletar o item.");
    });
  }

  function onItemClick(itemId) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.idItem === itemId ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
    // Aqui você também precisaria de uma chamada ao backend para persistir o estado 'isCompleted'
    // Ex: fetch(`http://localhost:3001/items/${itemId}/toggle`, { method: 'PATCH' }) ...
    console.log("Item marcado/desmarcado (apenas frontend):", itemId);
  }

  useEffect(() => {
    if (idLista) {
      fetchItems(idLista);
    } else {
      setItems([]); 
    }
  }, [idLista]);

  // Agrupa os itens por categoria usando useMemo para otimização
  const groupedItems = useMemo(() => {
    console.log("Agrupando itens por categoria...", items); 
    if (!items || items.length === 0) {
      return {};
    }
    const resultado =  items.reduce((acc, item) => { 
      const category = item.dsCategoria || "Outros"; // Categoria padrão se não houver
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
    console.log("Itens agrupados por categoria:", resultado);
    return resultado;
  }, [items]); // Recalcula apenas quando 'items' mudar

  return (
    <div>
      {idLista && Object.keys(groupedItems).length === 0 && items.length === 0 && (
        <p style={{ color: theme.textColor }}>Nenhum item nesta lista ainda. Adicione alguns!</p>
      )}

      {Object.keys(groupedItems).map(categoryName => (
        <div key={categoryName} className="mb-6"> {}
          <h2 
            className="text-xl font-semibold mb-2 capitalize" // `capitalize` para primeira letra maiúscula
            style={{ color: theme.textColor || 'inherit' }} // Garante cor do texto do tema
          >
            {categoryName}
          </h2>
          <ul 
            className="space-y-2 p-3 rounded-md shadow-md" 
            style={{ backgroundColor: theme.primaryColor }}
          >
            {groupedItems[categoryName].map((item) => (
              <li key={item.idItem} className="flex gap-2 items-center">
                <button
                  onClick={() => onItemClick(item.idItem)}
                  className={`w-full text-left p-2 rounded-md transition-opacity ${ 
                    item.isCompleted ? "line-through opacity-70" : "opacity-100" 
                  } text-white`}
                  style={{ backgroundColor: theme.accentColor }}
                >
                  {/* Não precisa mostrar item.dsCategoria aqui, pois já está no título */}
                  {item.nome} - {item.quantidade} und
                </button>
                <Button 
                  onClick={() => onDeleteItemClick(item.idItem)}
                  className="p-1.5 rounded-md flex-shrink-0" 
                  style={{ backgroundColor: theme.accentColor }}
                  aria-label={`Deletar ${item.nome}`} 
                >
                  <TrashIcon size={18} /> {}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ListItems;