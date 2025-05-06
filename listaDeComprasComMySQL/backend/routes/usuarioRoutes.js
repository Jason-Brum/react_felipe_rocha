// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// GET /usuarios – listar todos os usuários
router.get('/', usuarioController.listarUsuarios);

// POST /usuarios – criar um novo usuário
router.post('/', usuarioController.criarUsuario);

module.exports = router;
