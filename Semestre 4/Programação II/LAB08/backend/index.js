const express = require("express");
const cors = require("cors");

const pgp = require("pg-promise")({});
// npm install pg-promise

const usuario = "postgres";
const senha = "postgres";
const db = pgp(`postgres://${usuario}:${senha}@localhost:5432/lab08`);

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3010, () => console.log("Servidor rodando na porta 3010."));

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

// Get para obter as informações de um curso
app.get("/curso", async (req, res) => {
    try {
        const cursoId = parseInt(req.query.id);
        
        const curso = await db.one("select * from curso where idc = $1;", cursoId);
        console.log(`Retornando informações do curso ID: ${cursoId}`);
        
        res.json(curso).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

// Get para obter uma lista de cursos
app.get("/cursos", async (req, res) => {
    try {
        const curso = await db.any("select idc as id, nome, descr from curso");
        console.log(`Retornando lista de cursos`);
        
        res.json(curso).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

// Get para todas as ccrs
app.get("/ccrs", async (req, res) => {
    try {
        const ccr = await db.any("select ccr.idd as id, c.nome as curso, ccr.nome, ccr.descr from curso c join ccr on c.idc = ccr.idc");
        console.log(`Retornando lista de cursos`);
        
        res.json(ccr).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

// Get para os horários de um curso
app.get("/horarios", async (req, res) => {
    try {
        const cursoId = parseInt(req.query.id);
        const num_semestres = await db.one("select max(semestre) as mx from horarios where idc = $1;", cursoId);

        console.log(`Retornando horarios do curso ID: ${cursoId} com ${num_semestres.mx} semestres`);

        let resposta = [];
        for (let j = 1; j <= num_semestres.mx; j++ ){
            resposta[j-1] = await db.any("SELECT hora, seg, ter, qua, qui, sex, sab FROM grade g natural join horarios h where idc = $1 and semestre = $2;", [cursoId, j]);
        }

        // console.log(resposta);

        res.json(resposta).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.post("/curso", async (req, res) => {
    try {
        const cursoNome = req.body.nome;
        const cursoDescr = req.body.descr;
        console.log(`Nome: ${cursoNome} - Descr: ${cursoDescr}`);
        db.none(
            "INSERT INTO curso (nome, descr) VALUES ($1, $2);",
            [cursoNome, cursoDescr]
        );
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.post("/ccr", async (req, res) => {
    try {
        const ccrNome = req.body.nome;
        const ccrDescr = req.body.descr;
        const ccrCurso = req.body.curso;

        console.log(`Nome: ${ccrNome} - Descr: ${ccrDescr} - Curso: ${ccrCurso}`);

        const cursoID = await db.one("select idc from curso where nome=$1", ccrCurso);

        await db.none(
            "INSERT INTO ccr (idc, nome, descr) VALUES ($1, $2, $3);",
            [cursoID.idc, ccrNome, ccrDescr]
        );
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.post('/follow', (request, response) => {
    console.log('Recebi um follow');
    response.sendStatus(200); // OK

});

app.post('/unfollow', (request, response) => {
    console.log('Recebi um unfollow');
    response.sendStatus(200); // OK
});

