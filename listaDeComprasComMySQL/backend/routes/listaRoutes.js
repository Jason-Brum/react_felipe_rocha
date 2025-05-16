const express = require("express");
const router = express.Router();
const listaController = require("../controllers/listaController");

// GET /listas/:idUsuario – listar listas de um usuário específico
router.get("/:idUsuario", listaController.listarListasPorUsuario);

// POST /listas – criar nova lista de compras
router.post("/", listaController.criarLista);

// DELETE /listas/:id – excluir uma lista por ID
router.delete("/:id", listaController.excluirLista);

module.exports = router;
