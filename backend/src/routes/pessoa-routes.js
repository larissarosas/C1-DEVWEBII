let router = require('express').Router();

const pessoaModel = require('../models/pessoa-model');
const pessoaController = require('../controllers/pessoa-controller');

//Inserir pessoas
router.post('/', pessoaController.AdicionarPessoa);

//Listar todas as pessoas
router.get('/', pessoaController.listarPessoa);

//Listar as informações de uma determinada pessoa
router.get('/:id', pessoaController.listarPessoaPorID);

//Atualiza uma determinada pessoa
router.put('/:id', pessoaController.atualizarPessoa);

//Deletar uma determinada pessoa
router.delete('/:id', pessoaController.deletarPessoa);

module.exports = router;