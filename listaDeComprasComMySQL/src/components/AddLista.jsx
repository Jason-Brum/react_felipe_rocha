import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddLista = ({ idUsuario }) => {
  const [listas, setListas] = useState([]);
  const [novaLista, setNovaLista] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [nomeEditado, setNomeEditado] = useState('');

  useEffect(() => {
    if (!idUsuario) return;

    axios
      .get(`http://localhost:3001/listas/${idUsuario}`)
      .then((res) => setListas(res.data))
      .catch((err) => console.error('Erro ao buscar listas:', err));
  }, [idUsuario]);

  const adicionarLista = () => {
    if (novaLista.trim() === '') return;

    const nova = {
      nomeDaLista: novaLista,
      idUsuario: idUsuario,
      dataDeCriacao: new Date().toISOString().split('T')[0], // yyyy-mm-dd
      tema: null // ou um valor padrão
    };

    axios
      .post('http://localhost:3001/listas', nova)
      .then((res) => {
        const novaListaComId = {
          idLista: res.data.idLista,
          nomeDaLista: res.data.nomeDaLista,
          idUsuario: res.data.idUsuario,
          dataDeCriacao: res.data.dataDeCriacao,
          tema: res.data.tema,
        };
        setListas([...listas, novaListaComId]);
        setNovaLista('');
      })
      .catch((err) => {
        console.error('Erro ao adicionar lista:', err);
      });
  };

  const removerLista = (id) => {
    axios
      .delete(`http://localhost:3001/listas/${id}`)
      .then(() => {
        setListas(listas.filter((lista) => lista.idLista !== id));
      })
      .catch((err) => {
        console.error('Erro ao excluir lista:', err);
      });
  };

  const iniciarEdicao = (id, nomeAtual) => {
    setEditandoId(id);
    setNomeEditado(nomeAtual); 
  };

  const salvarEdicao = (id) => {
    axios
      .put(`http://localhost:3001/listas/${id}`, {
        nomeDaLista: nomeEditado,
      })
      .then(() => {
        setListas(
          listas.map((lista) =>
            lista.idLista === id ? { ...lista, nomeDaLista: nomeEditado } : lista
          )
        );
        setEditandoId(null);
        setNomeEditado('');
      })
      .catch((err) => {
        console.error('Erro ao editar lista:', err);
      });
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
            key={lista.idLista}
            className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
          >
            {editandoId === lista.idLista ? (
              <>
                <input
                  value={nomeEditado}
                  onChange={(e) => setNomeEditado(e.target.value)}
                  className="flex-1 p-1 border border-gray-300 rounded-md mr-2"
                />
                <button
                  onClick={() => salvarEdicao(lista.idLista)}
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
                <span>{lista.nomeDaLista}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => iniciarEdicao(lista.idLista, lista.nomeDaLista)}
                    className="text-blue-600 hover:underline"
                  >
                    Renomear
                  </button>
                  <button
                    onClick={() => removerLista(lista.idLista)}
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
