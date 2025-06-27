const db = require('../db/connection'); // Já é db.promise()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Função auxiliar para gerar o JWT
const generateToken = (idUsuario) => {
    return jwt.sign({ idUsuario }, process.env.JWT_SECRET, {
        expiresIn: '2h' // no ReactGram estava 7 dias '7d', só ajustar
    });
};

const registerUser = async (req, res) => {
    const { nome, email, cpf, senha } = req.body;

    if (!nome || !email || !cpf || !senha) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
    }

    try {
        const [userExist] = await db.query('SELECT * FROM usuario WHERE email = ? OR cpf = ?', [email, cpf]);

        if (userExist.length > 0) {
            return res.status(409).json({ error: 'Usuário já existe com este email ou CPF.' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        const dataCadastro = new Date();

        const [result] = await db.query(
            'INSERT INTO usuario (nome, email, cpf, senha, dataCadastro) VALUES (?, ?, ?, ?, ?)',
            [nome, email, cpf, hashedPassword, dataCadastro]
        );

        const newUserId = result.insertId;
        const token = generateToken(newUserId);

        // Retorna o token e os dados básicos do usuário recém-registrado e logado
        res.status(201).json({ 
            message: 'Usuário registrado com sucesso e logado!',
            token, 
            user: { idUsuario: newUserId, nome, email, cpf } 
        });

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
        const [rows] = await db.query('SELECT * FROM usuario WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Usuário não encontrado.' });
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(senha, user.senha);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        const token = generateToken(user.idUsuario); // Reutilizando a função generateToken

        res.json({ token, user: { idUsuario: user.idUsuario, nome: user.nome, email: user.email, cpf: user.cpf } });
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
};

// Nova função para atualizar o perfil do usuário
const updateProfile = async (req, res) => {
    // req.user vem do middleware de autenticação (contém idUsuario, nome, email, cpf)
    const userId = req.user.idUsuario; 
    const { nome, email, cpf, senha } = req.body;

    // Validação básica para o corpo da requisição
    if (!nome && !email && !cpf && !senha) {
        return res.status(400).json({ error: 'Pelo menos um campo deve ser fornecido para atualização.' });
    }

    try {
        let updateQuery = 'UPDATE usuario SET ';
        const updateValues = [];
        const updateFields = [];

        if (nome) {
            updateFields.push('nome = ?');
            updateValues.push(nome);
        }
        if (email) {
            // Verificar se o novo email já existe para outro usuário
            const [existingEmail] = await db.query('SELECT idUsuario FROM usuario WHERE email = ? AND idUsuario != ?', [email, userId]);
            if (existingEmail.length > 0) {
                return res.status(409).json({ error: 'Este email já está em uso por outro usuário.' });
            }
            updateFields.push('email = ?');
            updateValues.push(email);
        }
        if (cpf) {
            // Verificar se o novo CPF já existe para outro usuário
            const [existingCpf] = await db.query('SELECT idUsuario FROM usuario WHERE cpf = ? AND idUsuario != ?', [cpf, userId]);
            if (existingCpf.length > 0) {
                return res.status(409).json({ error: 'Este CPF já está em uso por outro usuário.' });
            }
            updateFields.push('cpf = ?');
            updateValues.push(cpf);
        }
        if (senha) {
            const hashedPassword = await bcrypt.hash(senha, 10);
            updateFields.push('senha = ?');
            updateValues.push(hashedPassword);
        }

        updateQuery += updateFields.join(', ');
        updateQuery += ' WHERE idUsuario = ?';
        updateValues.push(userId);

        if (updateFields.length === 0) {
            // Isso só aconteceria se o primeiro if (!nome && ...) falhasse por alguma razão
            return res.status(400).json({ error: 'Nenhum campo válido para atualização fornecido.' });
        }

        await db.query(updateQuery, updateValues);

        // Retorna o usuário atualizado (pode buscar novamente ou construir o objeto)
        const [updatedRows] = await db.query('SELECT idUsuario, nome, email, cpf FROM usuario WHERE idUsuario = ?', [userId]);
        const updatedUser = updatedRows[0];

        res.status(200).json({ 
            message: 'Perfil atualizado com sucesso!',
            user: updatedUser
        });

    } catch (err) {
        console.error('Erro ao atualizar perfil:', err);
        res.status(500).json({ error: 'Erro ao atualizar perfil.' });
    }
};

module.exports = { 
    registerUser, 
    loginUser,
    updateProfile 
};