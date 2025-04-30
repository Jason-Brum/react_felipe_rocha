const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const itemRoutes = require("./routes/itemRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rotas
app.use("/items", itemRoutes);

app.use("/test", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
