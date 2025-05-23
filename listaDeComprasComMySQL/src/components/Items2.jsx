import { TrashIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Button from "./Button";


function Items2({ items, categorias, onItemClick, onDeleteItemClick }) {
  const { theme } = useTheme();

  function getCategoriaNome(idCategoria) {
    const categoria = categorias.find((cat) => cat.idCategoria === idCategoria);
    return categoria ? categoria.nome : `Categoria ${idCategoria}`;
  }

  // Agrupa os itens por categoria
  const categoriasUnicas = Array.from(new Set(items.map(item => item.idCategoria)));

  return (
    <div className="space-y-4">
      {categoriasUnicas.map((idCategoria) => {
        const itemsDaCategoria = items.filter(item => item.idCategoria === idCategoria);
        return (
          <div key={idCategoria} className="mb-4">
            <h2 className="text-lg font-bold text-gray-700 border-b border-gray-300 pb-2">
              {getCategoriaNome(idCategoria)}
            </h2>
            <ul className="space-y-2 p-2 rounded-md shadow-md" style={{ backgroundColor: theme.primaryColor }}>
              {itemsDaCategoria.map((item) => (
                <li key={item.idItem} className="flex gap-2 items-center">
                  <button
                    onClick={() => onItemClick(item.idItem)}
                    className={`w-full text-left p-1 rounded-md ${
                      item.isCompleted ? "line-through" : ""
                    } text-white`}
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    {item.nome} - {item.quantidade} und
                  </button>
                  <Button
                    onClick={() => onDeleteItemClick(item.idItem)}
                    className="p-1 rounded-md"
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    <TrashIcon size={16} />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default Items2;
