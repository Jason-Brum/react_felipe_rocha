// components/AddItem.jsx
import { useState } from "react";
import Input from './Input';

function AddItem({ onAddItemSubmit }) {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");

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
        onChange={(event) => setQuantity(event.target.value)} 
      />
      <button
        onClick={() => {
          if (!title.trim() || !quantity.trim()) {
            alert("Por favor, preencha o nome e a quantidade");
            return;
          }
          onAddItemSubmit(title, quantity);
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
