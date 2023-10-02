const express = require("express");
const cors = require("cors");

const database = {
    clientes: [
        { id: 1, nome: "Edimar", email: "edimar@uffs.edu.br" },
        { id: 2, nome: "Gian", email: "gian@uffs.edu.br" },
    ],
};

const app = express();
app.use(cors()); //desabilita segurança para o desenvolvimento
app.use(express.json());

app.listen(3010, () => console.log("Servidor rodando na porta 3010."));

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.get("/clientes", (req, res) => {
    try {
        res.json(database.clientes).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/cliente", (req, res) => {
    try {
        const clienteId = parseInt(req.query.id);
        console.log(`Retornando ID: ${clienteId}`);
        res.json(database.clientes[clienteId - 1]).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});
