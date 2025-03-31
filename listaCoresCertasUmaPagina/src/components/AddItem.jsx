//Na pasta components, estão os componentes reutilizáveis (AddItem, Button, Input)

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

      {/* Contêiner flex para alinhar o select e o botão */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-md font-medium w-full md:w-2/3"
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
          className="px-4 py-2 rounded-md font-medium text-white w-full md:w-auto"
          style={{
            backgroundColor: theme.accentColor,
            marginLeft: "auto",
          }}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}

export default AddItem;
