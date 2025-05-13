// src/hooks/useAddItem.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useAddItem() {
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await axios.get('http://localhost:3001/categorias');
        const sorted = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
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
        idLista: 1,
      };

      const response = await axios.post('http://localhost:3001/items/', novoItem);

      setItem('');
      setQuantidade(1);
      setCategoria('');

      return response.data; // retorna o novo item para ser usado no componente
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
