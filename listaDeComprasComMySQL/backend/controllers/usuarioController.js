const db = require("../db/connection");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const usuarioController = {
  listarUsuarios: (req, res) => {
    db.query('SELECT idUsuario, nome, email, cpf, dataCadastro FROM usuario', (err, results) => {
      if (err) {
        console.error('Erro ao listar usuários:', err);
        return res.status(500).json({ erro: 'Erro ao buscar usuários' });
      }
      res.json(results);
    });
  },

  criarUsuario: async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

    const { nome, email, cpf, senha, dataCadastro } = req.body;

    try {
      // Verifica duplicidade de email ou CPF
      const [verifica] = await db.promise().query(
        "SELECT * FROM usuario WHERE email = ? OR cpf = ?",
        [email, cpf]
      );

      if (verifica.length > 0) {
        return res.status(400).json({ erro: "E-mail ou CPF já cadastrados." });
      }

      // Criptografa a senha
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(senha, salt);

      // Insere usuário
      const [result] = await db.promise().query(
        "INSERT INTO usuario (nome, email, cpf, senha, dataCadastro) VALUES (?, ?, ?, ?, ?)",
        [nome, email, cpf, senhaHash, dataCadastro]
      );

      res.status(201).json({
        mensagem: "Usuário criado com sucesso",
        id: result.insertId
      });

    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      res.status(500).json({ erro: "Erro interno ao criar usuário" });
    }
  }
};

module.exports = usuarioController;
