const express = require("express");
const cors = require("cors");
const db = require('./database');

const database = {
    clientes: [
        { id: 1, nome: "Edimar", email: "edimar@uffs.edu.br" },
        { id: 2, nome: "Gian", email: "gian@uffs.edu.br" },
    ],
};

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3010, () => console.log("Servidor rodando na porta 3010."));

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

// Get para obter as informações de um curso
app.get("/cursos", (req, res) => {
    try {
        const cursoId = parseInt(req.query.id);
        
        for(let curso of db.cursos){    
            if (curso.id == cursoId){
                console.log(`Retornando Curso ID: ${curso.id}`);

                res.send({
                    id: `${curso.id}`,
                    nome: `${curso.nome}`,
                    turno: `${curso.turno}`,
                    id_campus: `${curso.id_campus}`
                }
);
            }
        }
        res.send("Não encontrado");
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

// Get para os horários de um curso
app.get("/horarios", (req, res) => {
    try {
        const cursoId = parseInt(req.query.id);
        console.log(`Retornando ID: ${cursoId}`);

        let resposta = [];
        for (let horario of db.horarios){
            if (horario.id_curso == cursoId){
                resposta.push(horario.grade);
            }
        }

        res.json(resposta).status(200);
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

