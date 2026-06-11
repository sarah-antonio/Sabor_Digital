const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
// Importa o módulo Path do Node.js
// Esse módulo é utilizado para trabalhar com caminhos de arquivos e diretórios
const path = require('path');

// Middlewares globais
app.use(cors()); // Habilita o CORS para permitir requisições do frontend
app.use(express.json());

// Registro de todas as rotas da API centralizadas
app.use('/', routes);

// imagens no navegador 

// Define um middleware global do Express
app.use(

    // URL pública utilizada para acessar os arquivos
    '/files',

    // Torna a pasta uploads acessível pela web
    express.static(

        // Monta o caminho absoluto até a pasta uploads
        path.resolve(__dirname, 'uploads')

    )
);


module.exports = app;


