//Na pasta components, estão os componentes reutilizáveis (AddItem, Button, Input, Items)

import { useState } from "react";
import Input from './Input';
import { useTheme } from "../context/ThemeContext";

function AddItem({ onAddItemSubmit, categories }) {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const { theme } = useTheme();

  return (
    <div className={`space-y-4 p-6 rounded-md shadow-md`} style={{ backgroundColor: theme.selectBackgroundColor }}>
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
        className="px-4 py-2 rounded-md font-medium"
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
        className={`bg-${theme}-500 text-white px-4 py-2 rounded-md font-medium`}
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddItem;
