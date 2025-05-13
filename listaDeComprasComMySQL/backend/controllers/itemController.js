const db = require("../db/connection");

// Buscar todos os itens
const getItems = (req, res) => {
  db.query("SELECT * FROM item", (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
};

// Adicionar novo item
const addItem = (req, res) => {
  const { nome, quantidade, idCategoria, idLista } = req.body;

  const query = `
    INSERT INTO item (nome, quantidade, idCategoria, idLista)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [nome, quantidade, idCategoria, idLista], function (err, result) {
    if (err) return res.status(500).json({ erro: err.message });

    // Retorna o item recém-criado com o ID
    const newItem = {
      idItem: result.insertId,
      nome,
      quantidade,
      idCategoria,
      idLista,
      isCompleted: false, // padrão
    };

    res.status(201).json(newItem);
  });
};

// Deletar item
const deleteItem = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM item WHERE idItem = ?", [id], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.sendStatus(204);
  });
};

module.exports = {
  getItems,
  addItem,
  deleteItem,
};
