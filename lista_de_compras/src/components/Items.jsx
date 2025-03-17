import { TrashIcon } from "lucide-react";
import Button from "./Button";

function Items({ items, onItemClick, onDeleteItemClick }) {
  return (
    <div>
      <ul className="space-y-4 p-6 bg-red-100 rounded-md shadow">
        {items.map((item) => (
          <li key={item.id} className="flex gap-2 items-center">
            <button
              onClick={() => onItemClick(item.id)}
              className={`bg-red-400 w-full text-white text-left p-2 rounded-md ${
                item.isCompleted ? 'line-through' : ''
              }`}
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
