// Items.jsx
import { TrashIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Button from "./Button";

function Items({ items, onItemClick, onDeleteItemClick }) {
  const { theme } = useTheme();

  return (
    <div>
      <ul className={`space-y-4 p-6 rounded-md shadow-md bg-${theme}-100`}>
        {items.map((item) => (
          <li key={item.id} className="flex gap-2 items-center">
            <button
              onClick={() => onItemClick(item.id)}
              className={`w-full text-left p-2 rounded-md ${
                item.isCompleted ? "line-through" : ""
              } bg-${theme}-400 text-white`}
            >
              {item.title} - {item.quantity} und
            </button>
            <Button onClick={() => onDeleteItemClick(item.id)}>
              <TrashIcon />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Items;
