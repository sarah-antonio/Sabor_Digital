const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const path = require('path');

// Middlewares globais
app.use(cors()); // Habilita o CORS para permitir requisições do frontend
app.use(express.json());

// Registro de todas as rotas da API centralizadas
app.use('/', routes);

// imagens no navegador 

app.use('/files', express.static(path.resolve(__dirname, 'uploads')));


module.exports = app;


