const express = require("express");
const router = express.Router();
const listaController = require("../controllers/listaController");

// GET /listas – listar todas as listas de compras
router.get("/", listaController.listarListas);

// POST /listas – criar nova lista de compras
router.post("/", listaController.criarLista);

module.exports = router;
