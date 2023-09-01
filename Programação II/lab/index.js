const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())
app.listen(3001, () => console.log('Servidor rodando na porta 3001'));


app.get('/', (request, response) => {
    const nome = request.query.nome;
    console.log('Recebi uma request o tipo GET');
    response.send(`Olá ${nome}!`);
});

app.post('/', (request, response) => {
    const nome = request.body.nome;
    console.log('Recebi uma request o tipo GET');
    response.send(`Olá ${nome}!`);
});

// http://localhost:3001/
// nodemon index.js