import { useEffect, useState } from "react";

export default function Items3({ idLista }) {
  const [itens, setItens] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [idListaState, setIdListaState] = useState(idLista); // Para garantir que o idLista seja atualizado corretamente 
  
console.log("ID da lista no Items3:", idLista);

  // Buscar os itens da lista
  useEffect(() => {
    console.log("ID da lista:", idListaState);
    if (!idListaState) return;

    fetch(`http://localhost:3001/items/lista/${idListaState}`)
      .then((res) => res.json())
      .then((data) => setItens(data))
      .catch((err) => console.error("Erro ao buscar itens:", err));
  }, [idListaState]);

  // Buscar todas as categorias
  useEffect(() => {
    fetch("http://localhost:3001/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => console.error("Erro ao buscar categorias:", err));
  }, []);

  // Organizar os itens por categoria
  const itensPorCategoria = categorias
  .map((cat) => ({
    ...cat,
    itens: itens.filter((item) => item.idCategoria === cat.id),
  }))
  .filter((cat) => cat.itens.length > 0); // <-- aqui você filtra só as que têm itens


  // Lidar com o clique para marcar como comprado
  const handleItemClick = (itemId) => {
    fetch(`http://localhost:3001/items/marcar/${itemId}`, { method: "PUT" })
      .then(() => {
        setItens((prev) =>
          prev.map((item) =>
            item.id === itemId
              ? { ...item, comprado: !item.comprado }
              : item
          )
        );
      });
  };

  // Lidar com exclusão de item
  const handleDeleteItemClick = (itemId) => {
    fetch(`http://localhost:3001/items/${itemId}`, { method: "DELETE" })
      .then(() => {
        setItens((prev) => prev.filter((item) => item.id !== itemId));
      });
  };

  return (
    <div className="p-4">
      {itensPorCategoria.map((categoria) => (
        <div key={categoria.id} className="mb-6">
          <h2 className="text-lg font-bold mb-2">{categoria.nome}</h2>
          <ul className="space-y-1">
            {categoria.itens.map((item) => (
              <li
                key={item.id}
                className={`flex justify-between items-center border p-2 rounded ${
                  item.comprado ? "bg-green-100 line-through" : "bg-white"
                }`}
              >
                <span
                  className="flex-1 cursor-pointer"
                  onClick={() => handleItemClick(item.id)}
                >
                  {item.nome} – {item.quantidade}
                </span>
                <button
                  onClick={() => handleDeleteItemClick(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  🗑
                </button>
              </li>
            ))}
            {categoria.itens.length === 0 && (
              <li className="text-gray-500">Nenhum item nesta categoria</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
