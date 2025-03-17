import { useEffect, useState } from "react";
import AddItem from "./components/AddItem"; // Importa o componente pronto
import Items from "./components/Items"; // Importa o componente pronto
import "./index.css";
import { v4 } from 'uuid';

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')) || []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  function onItemClick(itemId) {
    const newItems = items.map((item) =>
      item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setItems(newItems);
  }

  function onDeleteItemClick(itemId) {
    setItems(items.filter((item) => item.id !== itemId));
  }

  function onAddItemSubmit(title, quantity) {
    const newItem = {
      id: v4(),
      title,
      quantity,
      isCompleted: false,
    };
    setItems([...items, newItem]);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="w-screen h-screen bg-red-700 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-red-100 text-3xl font-bold text-center">Lista de Compras</h1>
        <AddItem onAddItemSubmit={onAddItemSubmit} />
        <Items 
          items={items}
          onItemClick={onItemClick}
          onDeleteItemClick={onDeleteItemClick}
        />
        <button 
          onClick={handlePrint} 
          className="bg-red-500 text-white px-4 py-2 rounded-md w-full font-medium"
        >
          Imprimir Lista
        </button>
      </div>
    </div>
  );
}

export default App;
