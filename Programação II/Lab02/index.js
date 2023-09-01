// Importando DataBase
const db = require('./database');
console.log(db.cursos[0]);

// Importando ???
const express = require('express');
const bodyParser = require('body-parser')

// Instanciando servidor
const app = express();

// Inicializando servidor
app.use(bodyParser.json())
app.listen(3001, () => console.log('Servidor rodando na porta 3001'));

// Requesições:
// CURSOS

app.get('/cursos', (request, response) => {
    const id = request.query.id;
    console.log('Recebi uma request o tipo GET');

    for(let curso of db.cursos){    
        if (curso.id== id){
            response.send(`
            id = ${curso.id} / 
            nome = ${curso.nome} / 
            turno = ${curso.turno} / 
            id_campus = ${curso.id_campus}`);
        }
    }
    response.send("Não encontrado");

});

app.post('/cursos', (request, response) => {
    console.log('Recebi uma request o tipo POST');

    const curso = {
        id: request.body.id,
        nome: request.body.nome,
        turno: request.body.turno,
        id_campus: request.body.id_campus,
    }

    db.cursos.push(curso);
    response.send(`Curso ${curso.nome} inserido!`);
});

app.put('/cursos', (request, response) => {
    console.log('Recebi uma request o tipo PUT');

    const novo = {
        id: request.body.id,
        nome: request.body.nome,
        turno: request.body.turno,
        id_campus: request.body.id_campus,
    }

    for(let curso of db.cursos){    
        if (curso.id== novo.id){
            //Update values
            curso.nome = novo.nome;
            curso.turno = novo.turno;
            curso.id_campus = novo.id_campus

            response.send(`Dados alterados: 
            id = ${curso.id} / 
            nome = ${curso.nome} / 
            turno = ${curso.turno} / 
            id_campus = ${curso.id_campus}`);
        }
    }
    response.send("Não encontrado");
});

app.delete('/cursos', (request, response) => {
    const id = request.body.id;
    console.log('Recebi uma request o tipo DELETE');

    for (i in db.cursos){
        if (db.cursos[i].id == id){
            db.cursos.splice(i, 1);
            response.send(`Deletado com sucesso!`);
        }
    }

    response.send(`Não encontrado!`);
});

// DICIPLINAS

app.get('/ccrs', (request, response) => {
    const id = request.query.id;
    console.log('Recebi uma request o tipo GET');

    for(let ccr of db.ccrs){    
        console.log(`Executando for ${ccr.id}`);
        if (ccr.id == id){
            response.send(`
            id = ${ccr.id} / 
            nome = ${ccr.nome} / `);
        }
    }
    response.send("Não encontrado");

});

app.post('/ccrs', (request, response) => {
    console.log('Recebi uma request o tipo POST');

    const ccr = {
        id: request.body.id,
        nome: request.body.nome,
    }

    db.ccrs.push(ccr);
    response.send(`CCR ${ccr.nome} inserida!`);
});

app.put('/ccrs', (request, response) => {
    console.log('Recebi uma request o tipo PUT');

    const novo = {
        id: request.body.id,
        nome: request.body.nome,
    }

    for(let ccr of db.ccrs){    
        if (ccr.id== novo.id){
            //Update values
            ccr.nome = novo.nome;

            response.send(`Dados alterados: 
            id = ${ccr.id} / 
            nome = ${ccr.nome}`);
        }
    }
    response.send("Não encontrado");
});

app.delete('/ccrs', (request, response) => {
    const id = request.body.id;
    console.log('Recebi uma request o tipo DELETE');

    for (i in db.ccrs){
        if (db.ccrs[i].id == id){
            db.ccrs.splice(i, 1);
            response.send(`Deletado com sucesso!`);
        }
    }

    response.send(`Não encontrado!`);
});

// link = http://localhost:3001/
// inicializar servidor = nodemon index.js

// para inserir na lista, use push:
// db.cursos.push({ ... })

// para remover da lista, use splice passando o índice do elemento e a quantidade de
// elementos a serem removidos. Exemnplo para remover o primeiro elemento:
// db.cursos.splice(0, 1) remove um elemento a partir do índice 0
