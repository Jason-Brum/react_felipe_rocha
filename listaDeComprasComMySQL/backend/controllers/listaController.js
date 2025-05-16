const db = require("../db/connection");

const listaController = {
  // Listar listas de um usuário específico
  listarListasPorUsuario: (req, res) => {
    const { idUsuario } = req.params;

    const query = "SELECT * FROM lista_de_compras WHERE idUsuario = ?";
    db.query(query, [idUsuario], (err, results) => {
      if (err) {
        console.error("Erro ao listar listas do usuário:", err);
        return res.status(500).json({ erro: "Erro ao buscar listas do usuário" });
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
  },

  // Excluir uma lista por ID
  excluirLista: (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM lista_de_compras WHERE idLista = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Erro ao excluir lista:", err);
        return res.status(500).json({ erro: "Erro ao excluir lista de compras" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ erro: "Lista não encontrada" });
      }

      res.status(200).json({ mensagem: "Lista excluída com sucesso" });
    });
  }
};

module.exports = listaController;
