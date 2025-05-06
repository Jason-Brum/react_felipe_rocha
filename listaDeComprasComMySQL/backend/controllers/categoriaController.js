const db = require("../db/connection");

const categoriaController = {
  listarCategorias: (req, res) => {
    db.query("SELECT * FROM categoria", (err, results) => {
      if (err) {
        console.error("Erro ao listar categorias:", err);
        return res.status(500).json({ erro: "Erro ao buscar categorias" });
      }
      res.json(results);
    });
  },

  criarCategoria: (req, res) => {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: "O nome da categoria é obrigatório." });
    }

    const query = "INSERT INTO categoria (nome) VALUES (?)";
    db.query(query, [nome], (err, result) => {
      if (err) {
        console.error("Erro ao criar categoria:", err);
        return res.status(500).json({ erro: "Erro ao criar categoria" });
      }

      res.status(201).json({
        mensagem: "Categoria criada com sucesso",
        id: result.insertId,
        nome
      });
    });
  }
};

module.exports = categoriaController;
