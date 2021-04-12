let router = require('express').Router();
const unidadeSaudeModel = require('../models/unidade-saude-model');
const unidadeSaudeController = require('../controllers/unidade-saude-controller');

//Inserir unidade saúde
router.post('/', unidadeSaudeController.AdicionarUnidadeSaude);

//Listar todas as unidades de saúde
router.get('/', unidadeSaudeController.listarUnidadeSaude);

//Listar as informações de uma determinada unidade de saúde
router.get('/:id', unidadeSaudeController.listarUnidadeSaudePorID);

//Atualiza uma determinada unidade de saúde
router.put('/:id', unidadeSaudeController.atualizarUnidadeSaude);

//Deletar uma determinada unidade de saúde
router.delete('/:id', unidadeSaudeController.deletarUnidadeSaude);

module.exports = router;