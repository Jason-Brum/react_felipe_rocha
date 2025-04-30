import { useEffect, useState } from "react";
import Input from './Input';
import { useTheme } from "../context/ThemeContext";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

function AddItem({ onAddItemSubmit, categories }) {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const [isExpanded, setIsExpanded] = useState(() => {
    // Tenta carregar do localStorage ao iniciar
    const saved = localStorage.getItem("addItemExpanded");
    return saved === "true";
  });

  const { theme } = useTheme();

  const toggleExpansion = () => {
    setIsExpanded((prev) => {
      const newValue = !prev;
      localStorage.setItem("addItemExpanded", newValue);
      return newValue;
    });
  };

  return (
    <div className={`space-y-4 p-6 rounded-md shadow-md`} style={{ backgroundColor: theme.selectBackgroundColor }}>
      <button
        onClick={toggleExpansion}
        className="flex justify-between items-center w-full px-4 py-2 rounded-md font-medium text-white"
        style={{ backgroundColor: theme.accentColor }}
      >
        {isExpanded ? "Recolher" : "Adicionar Item"}
        {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-2 transition-all ease-in-out duration-300">
          <Input
            type="text"
            placeholder="Nome do item"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <Input
            type="number"
            placeholder="Quantidade"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-md font-medium w-full"
            style={{
              backgroundColor: theme.selectBackgroundColor,
              color: theme.selectTextColor,
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={() => {
              if (!title.trim() || !quantity.trim()) {
                alert("Por favor, preencha o nome e a quantidade");
                return;
              }
              onAddItemSubmit(title, quantity, category);
              setTitle("");
              setQuantity("");
            }}
            className="px-4 py-2 rounded-md font-medium text-white w-full"
            style={{ backgroundColor: theme.accentColor }}
          >
            Adicionar
          </button>
        </div>
      )}
    </div>
  );
}

export default AddItem;
