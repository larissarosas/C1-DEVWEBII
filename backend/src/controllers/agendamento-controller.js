const agendamentoModel = require('../models/agendamento-model');

exports.AdicionarAgendamento = (req, res) =>{
    agendamentoModel.find((err, pessoa) => {
        if(err){
            console.log("Não foi possível recuperar o agendamento");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar o agendamento e portanto inserir uma novo agendamento!"
            });
        }

        for(let i = 0; i < pessoa.length; i++){
            if(req.body.cpf_pessoa == agendamento[i].cpf_pessoa){
                res.json({
                    status: "erro",
                    message: `Já existe um agendamento marcado para data ${req.body.data_hora_agendamento}!`
                });
                return;
            }
        }

        let agendamento = new agendamentoModel();
        agendamento.pessoa_id =  req.body.pessoa_id;
        agendamento.unidade_id = req.body.unidade_id;
        agendamento.data_hora_agendamento = req.body.data_hora_agendamento;
        agendamento.necessidade_especiais = req.body.necessidade_especiais;
        agendamento.observação_agendamento = req.body.observação_agendamento;
        agendamento.save((erro) => {
            if(erro){
                res.send({
                    status: "erro",
                    message: `Não foi possível inserir o novo agendamento!`
                });
            }else{
                res.send({
                    status: "Ok",
                    message: `Pessoa ID: ${req.body.pessoa_id} agendada na data: ${req.body.data_hora_agendamento} com sucesso!`,
                    
                });
            }
        });
    });
}

exports.listarAgendamento = (req, res) => {
    agendamentoModel.find(function(err, agendamento){
        if(err){
            console.log("Não foi possivel recuperar os agendamentos!");
            res.json({
                status: "erro",
                message: "Não foi possivel recuperar os agendamentos!"
            });
        }else{
            res.json({
                status: "Ok",
                agendamento: agendamento
            });
        }
    });
}

exports.listarAgendamentoPorID = (req, res) => {
    let id_agendamento = req.params.id;

    agendamentoModel.findById(id_agendamento, function(err, agendamento){
        if(err || !agendamento){
            console.log(`Não foi possível recuperar o agendamento do ID: ${id_agendamento}`);
            res.json({
                status: "erro",
                message: `Não foi possível recuperar o agendamento do ID: ${id_agendamento}`
            });
        }else{
            res.json({
                status: "Ok",
                agendamento: agendamento
            });
        }
    });
}

exports.atualizarAgendamento = (req, res) => {
    let id_agendamento = req.params.id;

    agendamentoModel.findById(id_pessoa, (erro, agendamento) => {
        if(erro || !agendamento){
            console.log("Não foi possível recuperar o agendamento");
            res.json({
                status: "erro",
                message: `Não foi possível recuperar o agendamento de ID: ${id_agendamento} para atualização`
            });
        }else{
            agendamento.pessoa_id =  req.body.pessoa_id;
            agendamento.unidade_id = req.body.unidade_id;
            agendamento.data_hora_agendamento = req.body.data_hora_agendamento;
            agendamento.necessidade_especiais = req.body.necessidade_especiais;
            agendamento.observação_agendamento = req.body.observação_agendamento;
            agendamento.save((erro) => {
            if(erro){
                res.send({
                    status: "erro",
                    message: `Houve um erro ao atualizar o agendamento!`
                });
            }else{
                res.send({
                    status: "Ok",
                    message: `Agendamento atualizado com sucesso!`,
                    
                });
            }
            });
        }
    });
}

exports.deletarAgendamento = (req, res) => {
    let id_agendamento = req.params.id;

    agendamentoModel.remove({
        _id: id_agendamento
    }, (err) => {
        if(err){
            res.json({
                status: "erro",
                message: "Houve um erro ao deletar o agendamento!"
            });
        }else{
            res.json({
                status: "Ok",
                message: `Agendamento deletado com sucesso`
            });
        }
        
    });
}