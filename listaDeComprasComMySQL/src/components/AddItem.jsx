import React from "react";
import { useAddItem } from "../hooks/useAddItem";

const AddItem = ({ onItemAdded, idLista }) => {
  const {
    item,
    quantidade,
    categoria,
    categorias,
    setItem,
    setQuantidade,
    setCategoria,
    adicionarItem,
  } = useAddItem(idLista);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoItem = await adicionarItem(); // recebe item novo do backend
    if (novoItem && onItemAdded) {
      onItemAdded(novoItem); // atualiza a lista no App
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Item"
        className="border p-2 rounded"
      />
      <input
        type="number"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
        placeholder="Quantidade"
        className="border p-2 rounded"
      />
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Selecione uma categoria</option>
        {categorias.map((cat) => (
          <option key={cat.idCategoria} value={cat.idCategoria}>
            {cat.nome}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-red-600 text-white p-2 rounded">
        Adicionar
      </button>
    </form>
  );
};

export default AddItem;
