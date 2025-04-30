const db = require("../db/connection");

// Buscar todos os itens
const getItems = (req, res) => {
  db.query("SELECT * FROM items", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Adicionar novo item
const addItem = (req, res) => {
  const { title, quantity, category } = req.body;
  const sql = "INSERT INTO items (title, quantity, category) VALUES (?, ?, ?)";
  db.query(sql, [title, quantity, category], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, title, quantity, category });
  });
};

// Deletar item
const deleteItem = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM items WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.sendStatus(204);
  });
};

module.exports = {
  getItems,
  addItem,
  deleteItem,
};
