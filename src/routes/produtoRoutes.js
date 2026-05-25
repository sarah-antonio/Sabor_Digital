const express = require('express');
const router = express.Router();
const ProdutoController = require('../controller/produtoController')
const upload = require('../config/multer');


router.get('/', ProdutoController.listar)
router.get('/:id',ProdutoController.buscarPorId)
router.put('/:id',ProdutoController.atualizar)
router.delete('/:id',ProdutoController.deletar)
router.post('/', upload.single('imagem'), ProdutoController.cadastrar)

module.exports = router

