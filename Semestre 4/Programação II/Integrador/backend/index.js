const express = require("express");
const cors = require("cors");

const pgp = require("pg-promise")({});
// npm install pg-promise

const usuario = "postgres";
const senha = "postgres";
const db = pgp(`postgres://${usuario}:${senha}@localhost:5432/integrador`);

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3010, () => console.log("Servidor rodando na porta 3010."));

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

// Get para obter uma lista de cursos
app.get("/estoque", async (req, res) => {
    try {
        const curso = await db.any("select m.id, m.nome, m.qtd, b.un_med, m.preco_total, m.marca, m.data_val, m.data_cad, b.qtd_seg from materia_prima m natural join bem b;");

        console.log(`Retornando lista de cursos`);
        
        res.json(curso).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});


app.post("/estoque", async (req, res) => {
    try {
        const nome = req.body.nome;
        const marca = req.body.marca;
        const qtd = req.body.qtd;
        const data_val = req.body.data_val;
        const preco_total = req.body.preco_total;
        const data_cad = new Date();

        const formatarData = (data) => {
            const dia = String(data.getDate()).padStart(2, '0');
            const mes = String(data.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11
            const ano = data.getFullYear();
            return `${dia}/${mes}/${ano}`;
        };

        const data_cad_formatada = formatarData(data_cad);

        console.log(`Nome: ${nome} - Marca: ${marca} - DataV: ${data_val} - qtd: ${qtd} - preco_total: ${preco_total} - data_cad: ${data_cad_formatada}`);
        db.none(
            "INSERT INTO materia_prima (nome, data_val, marca, preco_total, data_cad, qtd) VALUES ($1, $2, $3, $4, $5, $6);",
            [nome, data_val, marca, preco_total, data_cad_formatada, qtd]
        );
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

