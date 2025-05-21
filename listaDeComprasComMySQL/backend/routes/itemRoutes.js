const express = require("express");
const router = express.Router();
const { getAllItems, getItemsByLista, addItem, deleteItem } = require("../controllers/itemController");

router.get("/", getAllItems);
router.get("/lista/:idLista", getItemsByLista);
router.post("/", addItem);
router.delete("/:id", deleteItem);

module.exports = router;
