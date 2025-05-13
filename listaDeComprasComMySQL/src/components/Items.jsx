// Items.jsx

// Items.jsx
import { TrashIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Button from "./Button";

function Items({ items, onItemClick, onDeleteItemClick }) {
  const { theme } = useTheme();

  return (
    <div>
      <ul className="space-y-2 p-2 rounded-md shadow-md" style={{ backgroundColor: theme.primaryColor }}>
        {items.map((item) => (
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

export default Items;
