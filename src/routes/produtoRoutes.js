const express = require('express');
const router = express.Router();
const ProdutoController = require('../controller/produtoController')
const upload = require('../config/multer');


router.get('/', ProdutoController.listar)
router.get('/:id',ProdutoController.buscarPorId)
router.put('/:id',ProdutoController.atualizar)
router.delete('/:id',ProdutoController.deletar)
// Cria uma rota POST na URL "/"
// Essa rota será utilizada para cadastrar um novo produto
router.post(

    '/',

    // Middleware do Multer responsável por receber
    // apenas um arquivo enviado no campo "imagem"
    upload.single('imagem'),

    // Após processar a imagem, chama o método cadastrar
    // do ProdutoController para salvar os dados do produto
    ProdutoController.cadastrar

);

module.exports = router

