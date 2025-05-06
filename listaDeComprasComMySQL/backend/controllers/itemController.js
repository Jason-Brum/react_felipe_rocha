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

  if (!nome || !quantidade || !idCategoria || !idLista) {
    return res.status(400).json({ erro: "nome, quantidade, idCategoria e idLista são obrigatórios." });
  }

  const sql = "INSERT INTO item (nome, quantidade, idCategoria, idLista) VALUES (?, ?, ?, ?)";
  db.query(sql, [nome, quantidade, idCategoria, idLista], (err, result) => {
    if (err) return res.status(500).json({ erro: err.message });

    res.status(201).json({
      idItem: result.insertId,
      nome,
      quantidade,
      idCategoria,
      idLista
    });
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
