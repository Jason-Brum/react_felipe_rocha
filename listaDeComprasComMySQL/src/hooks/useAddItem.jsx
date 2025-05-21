// src/hooks/useAddItem.js
import { useState, useEffect } from 'react';

export function useAddItem(idLista) {
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const res = await fetch('http://localhost:3001/categorias');
        const data = await res.json();
        const sorted = data.sort((a, b) => a.nome.localeCompare(b.nome));
        setCategorias(sorted);
      } catch (err) {
        console.error('Erro ao buscar categorias:', err);
        setError('Erro ao carregar categorias');
      }
    }

    fetchCategorias();
  }, []);

  const adicionarItem = async () => {
    if (!item || !quantidade || !categoria) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const novoItem = {
        nome: item,
        quantidade,
        idCategoria: categoria,
        idLista: idLista, // agora usa o valor recebido como parâmetro
      };

      const res = await fetch('http://localhost:3001/items/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoItem),
      });

      if (!res.ok) throw new Error('Erro ao adicionar item');

      const data = await res.json();

      setItem('');
      setQuantidade(1);
      setCategoria('');

      return data; // retorna o novo item para ser usado no componente
    } catch (err) {
      console.error('Erro ao adicionar item:', err);
      setError('Erro ao adicionar item');
    } finally {
      setLoading(false);
    }
  };

  return {
    item,
    setItem,
    quantidade,
    setQuantidade,
    categoria,
    setCategoria,
    categorias,
    adicionarItem,
    loading,
    error,
  };
}
