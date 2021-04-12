const unidadeSaudeModel = require('../models/unidade-saude-model');

exports.AdicionarUnidadeSaude = (req, res) =>{
    unidadeSaudeModel.find((err, unidSaude) => {
        if(err){
            console.log("Não foi possível recuperar a unidade de saúde");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar a unidade de saúde"
            });
        }

        for(let i = 0; i < unidSaude.length; i++){
            if(req.body.email_unidade == unidSaude[i].email_unidade){
                res.json({
                    status: "erro",
                    message: `A unidade de saúde ${req.body.nome_unidade} já está cadastrada com o e-mail ${req.body.email_unidade}!`
                });
                return;
            }
        }

        let unidadeSaude = new unidadeSaudeModel();
        unidadeSaude.nome_unidade = req.body.nome_unidade;
        unidadeSaude.descricao_unidade = req.body.descricao_unidade;
        unidadeSaude.endereco_unidade = req.body.endereco_unidade;
        unidadeSaude.telefone_unidade = req.body.telefone_unidade;
        unidadeSaude.email_unidade = req.body.email_unidade;
        unidadeSaude.latlong_unidade = req.body.latlong_unidade;
        unidadeSaude.save((erro) => {
            if(erro){
                res.send({
                    status: "erro",
                    message: "Não foi possível inserir essa unidade de saúde!"
                });
            }else{
                res.send({
                    status: "Ok",
                    message: `Unidade de saúde ${req.body.nome_unidade} inserida com sucesso!`
                });
            }
        });
    });
}

exports.listarUnidadeSaude = (req, res) => {
    unidadeSaudeModel.find(function(err, unidadeSaude){
        if(err){
            console.log("Não foi possivel recuperar as unidades de saúde!");
            res.json({
                status: "erro",
                message: "Não foi possivel recuperar as unidades de saúde!"
            });
        }else{
            res.json({
                status: "Ok",
                unidadeSaude: unidadeSaude
            });
        }
    });
}

exports.listarUnidadeSaudePorID = (req, res) => {
    let id_unidadeSaude = req.params.id;

    unidadeSaudeModel.findById(id_unidadeSaude, function(err, unidadeSaude){
        if(err || !unidadeSaude){
            console.log(`Não foi possível recuperar a unidade de saúde do ID: ${id_unidadeSaude}`);
            res.json({
                status: "erro",
                message: `Não foi possível recuperar a unidade saúde do ID: ${id_unidadeSaude}`
            });
        }else{
            res.json({
                status: "Ok",
                unidadeSaude: unidadeSaude
            });
        }
    });
}

exports.atualizarUnidadeSaude = (req, res) => {
    let id_unidadeSaude = req.params.id;

    unidadeSaudeModel.findById(id_unidadeSaude, (erro, unidadeSaude) => {
        if(erro || !unidadeSaude){
            console.log("Não foi possível recuperar a unidade saúde");
            res.json({
                status: "erro",
                message: `Não foi possível recuperar a unidade saúde de ID: ${id_unidadeSaude} para atualização`
            });
        }else{
            unidadeSaude.nome_unidade = req.body.nome_unidade;
            unidadeSaude.descricao_unidade = req.body.descricao_unidade;
            unidadeSaude.endereco_unidade = req.body.endereco_unidade;
            unidadeSaude.telefone_unidade = req.body.telefone_unidade;
            unidadeSaude.email_unidade = req.body.email_unidade;
            unidadeSaude.latlong_unidade = req.body.latlong_unidade;
            unidadeSaude.save((err) => {
                if(err){
                    res.json({
                        status: "erro",
                        message: "Houve um erro ao atualizar essa unidade saúde!"
                    });
                }else{
                    res.json({
                        status: "Ok",
                        message: `Unidade Saúde ${unidadeSaude.nome_unidade} atualizado com sucesso!`
                    });
                }
            });
        }
    });
}

exports.deletarUnidadeSaude = (req, res) => {
    let id_unidadeSaude = req.params.id;

    unidadeSaudeModel.remove({
        _id: id_unidadeSaude
    }, (err) => {
        if(err){
            res.json({
                status: "erro",
                message: "Houve um erro ao deletar essa unidade saúde!"
            });
        }else{
            res.json({
                status: "Ok",
                message: `Unidade saúde deletada com sucesso`
            });
        }
        
    });
}