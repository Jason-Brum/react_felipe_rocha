import { useState, useEffect } from "react";

export const useAddItem = () => {
  const [item, setItem] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [erros, setErros] = useState({}); //Criei esse estado para armazenar os erros de validação

  useEffect(() => {
    fetch("http://localhost:3001/categorias")
      .then((res) => res.json())
      .then(setCategorias)
      .catch((err) => console.error("Erro ao buscar categorias:", err));
  }, []);

  const adicionarItem = async (idLista) => {
    const novosErros = {}; //Novo objeto para armazenar os erros de validação por campo
    if (!item) {novosErros.item = "Campo item é obrigatório";}
    if (!quantidade) {novosErros.quantidade = "Campo quantidade é obrigatório";}
    if (!categoria) {novosErros.categoria = "A categoria deve ser selecionada";}
    if (!idLista) {novosErros.idLista = "Nenhuma lista foi selecionada";}

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return null;
    }

    const novoItem = {
      nome: item,
      quantidade: parseInt(quantidade),
      idCategoria: parseInt(categoria),
      idLista: parseInt(idLista),
    };

    try {
      const res = await fetch("http://localhost:3001/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoItem),
      });

      if (!res.ok) {
        throw new Error("Erro ao adicionar item");
      }

      const data = await res.json();

      // Limpa os campos após adicionar
      setItem("");
      setQuantidade("");
      setCategoria("");
      setErros({}); // Limpa os erros após adicionar com sucesso

      return data;
    } catch (err) {
      console.error("Erro ao adicionar item:", err);
      alert("Erro ao adicionar item. Tente novamente.");
      return null;
    }
  };

  return {
    item,
    quantidade,
    categoria,
    categorias,
    erros,
    setItem,
    setQuantidade,
    setCategoria,
    adicionarItem,
  };
};
