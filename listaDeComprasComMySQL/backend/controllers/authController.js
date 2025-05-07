const db = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const registerUser = async (req, res) => {
  const { nome, email, cpf, senha } = req.body;

  if (!nome || !email || !cpf || !senha) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  try {
    const [userExist] = await db.promise().query('SELECT * FROM usuario WHERE email = ? OR cpf = ?', [email, cpf]);

    if (userExist.length > 0) {
      return res.status(409).json({ error: 'Usuário já existe com este email ou CPF.' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const dataCadastro = new Date();

    await db.promise().query(
      'INSERT INTO usuario (nome, email, cpf, senha, dataCadastro) VALUES (?, ?, ?, ?, ?)',
      [nome, email, cpf, hashedPassword, dataCadastro]
    );

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    console.error('Erro no registro:', err);
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
};

const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Informe o email e a senha.' });
  }

  try {
    const [rows] = await db.promise().query('SELECT * FROM usuario WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    const token = jwt.sign({ idUsuario: user.idUsuario }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });

    res.json({ token, user: { id: user.idUsuario, nome: user.nome, email: user.email } });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
};

module.exports = { registerUser, loginUser };
