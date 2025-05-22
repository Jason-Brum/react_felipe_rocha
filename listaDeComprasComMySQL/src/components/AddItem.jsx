import React from "react";
import { useAddItem } from "../hooks/useAddItem";

const AddItem = ({ onItemAdded, idLista }) => {
  const {
    item,
    quantidade,
    categoria,
    categorias,
    erros, //Incluí o objeto de erros aqui vindo do hook useAddItem
    setItem,
    setQuantidade,
    setCategoria,
    adicionarItem,
  } = useAddItem();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoItem = await adicionarItem(idLista);
    if (novoItem && onItemAdded) {
      onItemAdded(novoItem);
    }
  };

  return ( //Cada campo agora é renderizado dentro de uma div exclusiva para que o erro de validação apareça logo abaixo do campo correspondente
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <div>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Item"
          className="border p-2 rounded w-full"
        />
        {erros.item && <p className="text-red-500 text-sm mt-1">{erros.item}</p>} 
      </div>
        
      <div>
        <input 
          type="number" min = "1"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          placeholder="Quantidade"
          className="border p-2 rounded w-full"
        />
        {erros.quantidade && <p className="text-red-500 text-sm mt-1">{erros.quantidade}</p>}
      </div>

      <div>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((cat) => (
            <option key={cat.idCategoria} value={cat.idCategoria}>
              {cat.nome}
            </option>
          ))}
        </select>
        {erros.categoria && <p className="text-red-500 text-sm mt-1">{erros.categoria}</p>}
      </div>

      <button type="submit" className="bg-red-600 text-white p-2 rounded">
        Adicionar
      </button>
    </form>
  );
};

export default AddItem;
