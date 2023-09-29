const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.listen(3002, () => console.log('Servidor na porta 3001.'));
app.use(express.static(`${__dirname}/public`));

// Retorna uma pagina html na request
app.get('/', (request, response) => {
    response.sendFile(`${__dirname}/index.html`);
});

app.post('/pessoa/:id', (request, response) => {
    const nome = request.body.nome;
    console.log('Recebi uma request do tipo POST');
    response.send(`Olá ${nome}!`);
});