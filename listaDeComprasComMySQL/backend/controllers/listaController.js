const db = require("../db/connection");

const listaController = {
  // Listar todas as listas
  listarListas: (req, res) => {
    db.query("SELECT * FROM lista_de_compras", (err, results) => {
      if (err) {
        console.error("Erro ao listar listas de compras:", err);
        return res.status(500).json({ erro: "Erro ao buscar listas de compras" });
      }
      res.json(results);
    });
  },

  // Criar nova lista
  criarLista: (req, res) => {
    const { dataDeCriacao, tema, nomeDaLista, idUsuario } = req.body;

    if (!dataDeCriacao || !nomeDaLista || !idUsuario) {
      return res.status(400).json({ erro: "dataDeCriacao, nomeDaLista e idUsuario são obrigatórios." });
    }

    const query = `
      INSERT INTO lista_de_compras (dataDeCriacao, tema, nomeDaLista, idUsuario)
      VALUES (?, ?, ?, ?)
    `;

    db.query(query, [dataDeCriacao, tema, nomeDaLista, idUsuario], (err, result) => {
      if (err) {
        console.error("Erro ao criar lista:", err);
        return res.status(500).json({ erro: "Erro ao criar lista de compras" });
      }

      res.status(201).json({
        mensagem: "Lista criada com sucesso",
        idLista: result.insertId,
        dataDeCriacao,
        tema,
        nomeDaLista,
        idUsuario
      });
    });
  }
};

module.exports = listaController;
