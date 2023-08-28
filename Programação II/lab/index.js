const express = require('express');

const app = express();

app.listen(3001, () => console.log('Servidor rodando na porta 3001'));


app.get('/', (request, response) => {
    console.log('Recebi uma request o tipo GET');
    response.send('Hello world!');
});


// http://localhost:3001/