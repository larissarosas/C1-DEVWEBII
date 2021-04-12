let router = require('express').Router();

const agendamentoModel = require('../models/agendamento-model');
const agendamentoController = require('../controllers/agendamento-controller');

//Inserir agendamento
router.post('/', agendamentoController.AdicionarAgendamento);

//Listar todos agendamentos
router.get('/', agendamentoController.listarAgendamento);

//Listar as informações de um determinado agendamento
router.get('/:id', agendamentoController.listarAgendamentoPorID);

//Atualiza um determinado agendamento
router.put('/:id', agendamentoController.atualizarAgendamento);
//Deletar um determinado agendamento
router.delete('/:id', agendamentoController.deletarAgendamento);

module.exports = router;