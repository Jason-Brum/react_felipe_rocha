import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Você pode usar fetch também, mas axios facilita

const AddLista = ({ idUsuario }) => {
  const [listas, setListas] = useState([]);
  const [novaLista, setNovaLista] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [nomeEditado, setNomeEditado] = useState('');

  // useEffect para buscar listas do usuário
  useEffect(() => {
    if (!idUsuario) return;

    axios.get(`http://localhost:3000/listas/${idUsuario}`)
      .then((res) => setListas(res.data))
      .catch((err) => console.error('Erro ao buscar listas:', err));
  }, [idUsuario]);

  const adicionarLista = () => {
    if (novaLista.trim() === '') return;
    const nova = { id: Date.now(), nome: novaLista };
    setListas([...listas, nova]);
    setNovaLista('');
  };

  const removerLista = (id) => {
    setListas(listas.filter((lista) => lista.id !== id));
  };

  const iniciarEdicao = (id, nomeAtual) => {
    setEditandoId(id);
    setNomeEditado(nomeAtual);
  };

  const salvarEdicao = (id) => {
    setListas(
      listas.map((lista) =>
        lista.id === id ? { ...lista, nome: nomeEditado } : lista
      )
    );
    setEditandoId(null);
    setNomeEditado('');
  };

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-semibold mb-2">Suas Listas</h2>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nome da nova lista"
          value={novaLista}
          onChange={(e) => setNovaLista(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={adicionarLista}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Adicionar
        </button>
      </div>

      <ul className="space-y-2">
        {listas.map((lista) => (
          <li
            key={lista.id}
            className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
          >
            {editandoId === lista.id ? (
              <>
                <input
                  value={nomeEditado}
                  onChange={(e) => setNomeEditado(e.target.value)}
                  className="flex-1 p-1 border border-gray-300 rounded-md mr-2"
                />
                <button
                  onClick={() => salvarEdicao(lista.id)}
                  className="text-green-600 hover:underline mr-2"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setEditandoId(null)}
                  className="text-gray-500 hover:underline"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <span>{lista.nome}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => iniciarEdicao(lista.id, lista.nome)}
                    className="text-blue-600 hover:underline"
                  >
                    Renomear
                  </button>
                  <button
                    onClick={() => removerLista(lista.id)}
                    className="text-red-600 hover:underline"
                  >
                    Excluir
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddLista;
