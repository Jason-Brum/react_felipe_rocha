// components/AddItem.jsx
import { useState } from "react";
import Input from './Input';

function AddItem({ onAddItemSubmit, categories }) {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState(categories[0]);

  return (
    <div className="space-y-4 p-6 bg-red-100 rounded-md shadow flex flex-col">
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
        onChange={(e) => setCategory(event.target.value)} 
        className="border border-red-300 px-4 py-2 rounded-md font-medium text-gray-700"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}</option>
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
        className="bg-red-500 text-white px-4 py-2 rounded-md font-medium"
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddItem;
