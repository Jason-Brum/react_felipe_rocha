import React, { useState, useEffect } from 'react';

const AddLista = ({ idUsuario }) => {
  const [listas, setListas] = useState([]); //Armazena as listas do usuário em um array vazio
  const [novaLista, setNovaLista] = useState(''); //Valor do input para adicionar uma nova lista
  const [editandoId, setEditandoId] = useState(null); //Armazena o id da lista que está sendo editada
  const [nomeEditado, setNomeEditado] = useState(''); //Armazena o novo nome da lista que está sendo editada

  useEffect(() => {
    if (!idUsuario) return; //Condição para não buscar listas se o idUsuario não estiver definido

    fetch(`http://localhost:3001/listas/${idUsuario}`) //Requisição para buscar as listas do usuário no backend
      .then((res) => res.json())
      .then((data) => setListas(data))
      .catch((err) => console.error('Erro ao buscar listas:', err));
  }, [idUsuario]);

  const adicionarLista = () => {
    if (novaLista.trim() === '') return; //Verifica se o campo de nova lista não está vazio

    const nova = {
      nomeDaLista: novaLista,
      idUsuario: idUsuario,
      dataDeCriacao: new Date().toISOString().split('T')[0],
      tema: null
    };

    fetch('http://localhost:3001/listas', { //
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nova),
    })
      .then((res) => res.json())
      .then((data) => {
        const novaListaComId = {
          idLista: data.idLista,
          nomeDaLista: data.nomeDaLista,
          idUsuario: data.idUsuario,
          dataDeCriacao: data.dataDeCriacao,
          tema: data.tema,
        };
        setListas([...listas, novaListaComId]);
        setNovaLista('');
      })
      .catch((err) => console.error('Erro ao adicionar lista:', err));
  };

  const removerLista = (id) => {
    fetch(`http://localhost:3001/listas/${id}`, { //Requisição para remover a lista do backend, o id é passado como parâmetro
      method: 'DELETE',
    })
      .then(() => {
        setListas(listas.filter((lista) => lista.idLista !== id)); //Remove a lista do estado local
      })
      .catch((err) => console.error('Erro ao excluir lista:', err));
  };

  const iniciarEdicao = (id, nomeAtual) => {
    setEditandoId(id);
    setNomeEditado(nomeAtual);
  };

  const salvarEdicao = (id) => {
    fetch(`http://localhost:3001/listas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nomeDaLista: nomeEditado }),
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
      .catch((err) => console.error('Erro ao editar lista:', err));
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
