// controllers/usuarioController.js
const db = require("../db/connection");


const usuarioController = {
  listarUsuarios: (req, res) => {
    db.query('SELECT * FROM usuario', (err, results) => {
      if (err) {
        console.error('Erro ao listar usuários:', err);
        res.status(500).json({ erro: 'Erro ao buscar usuários' });
      } else {
        res.json(results);
      }
    });
  },

  criarUsuario: (req, res) => {
    const { nome, email, cpf } = req.body;

    if (!nome || !email || !cpf) {
      return res.status(400).json({ erro: 'Nome, email e CPF são obrigatórios.' });
    }

    const query = 'INSERT INTO usuario (nome, email, cpf) VALUES (?, ?, ?)';
    db.query(query, [nome, email, cpf], (err, result) => {
      if (err) {
        console.error('Erro ao criar usuário:', err);
        res.status(500).json({ erro: 'Erro ao criar usuário' });
      } else {
        res.status(201).json({ mensagem: 'Usuário criado com sucesso', id: result.insertId });
      }
    });
  }
};

module.exports = usuarioController;
