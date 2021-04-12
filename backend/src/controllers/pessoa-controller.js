const pessoaModel = require('../models/pessoa-model');

exports.AdicionarPessoa = (req, res) =>{
    pessoaModel.find((err, pessoas) => {
        if(err){
            console.log("Não foi possível recuperar as pessoas");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar as pessoas e portanto inserir uma nova pessoa!"
            });
        }

        for(let i = 0; i < pessoas.length; i++){
            if(req.body.email_pessoa == pessoas[i].email_pessoa){
                res.json({
                    status: "erro",
                    message: `A pessoa ${req.body.nome_pessoa} já está cadastrada com o e-mail ${req.body.email_pessoa}!`
                });
                return;
            }
        }

        let pessoa = new pessoaModel();
        pessoa.nome_pessoa = req.body.nome_pessoa;
        pessoa.cpf_pessoa = req.body.cpf_pessoa;
        pessoa.data_nascimento_pessoa = req.body.data_nascimento_pessoa;
        pessoa.telefone_pessoa = req.body.telefone_pessoa;
        pessoa.grupo_prioritario = req.body.grupo_prioritario;
        pessoa.endereco_pessoa = req.body.endereco_pessoa;
        pessoa.email_pessoa = req.body.email_pessoa;
        pessoa.save((erro) => {
            if(erro){
                res.send({
                    status: "erro",
                    message: `Não foi possível inserir essa pessoa!`
                });
            }else{
                res.send({
                    status: "Ok",
                    message: `Pessoa ${req.body.nome_pessoa} inserido com sucesso!`,
                    
                });
            }
        });
    });
}

exports.listarPessoa = (req, res) => {
    pessoaModel.find(function(err, pessoas){
        if(err){
            console.log("Não foi possivel recuperar as pessoas!");
            res.json({
                status: "erro",
                message: "Não foi possivel recuperar as pessoas!"
            });
        }else{
            res.json({
                status: "Ok",
                pessoas: pessoas
            });
        }
    });
}

exports.listarPessoaPorID = (req, res) => {
    let id_pessoa = req.params.id;

    pessoaModel.findById(id_pessoa, function(err, pessoa){
        if(err || !pessoa){
            console.log(`Não foi possível recuperar a pessoa do ID: ${id_pessoa}`);
            res.json({
                status: "erro",
                message: `Não foi possível recuperar a pessoa do ID: ${id_pessoa}`
            });
        }else{
            res.json({
                status: "Ok",
                pessoa: pessoa
            });
        }
    });
}

exports.atualizarPessoa = (req, res) => {
    let id_pessoa = req.params.id;

    pessoaModel.findById(id_pessoa, (erro, pessoa) => {
        if(erro || !pessoa){
            console.log("Não foi possível recuperar a pessoa");
            res.json({
                status: "erro",
                message: `Não foi possível recuperar a pessoa de ID: ${id_pessoa} para atualização`
            });
        }else{
            pessoa.nome_pessoa = req.body.nome_pessoa;
            pessoa.cpf_pessoa = req.body.cpf_pessoa;
            pessoa.data_nascimento = req.body.data_nascimento;
            pessoa.telefone_pessoa = req.body.telefone_pessoa;
            pessoa.grupo_prioritario = req.body.grupo_prioritario;
            pessoa.endereco_pessoa = req.body.endereco_pessoa;
            pessoa.email_pessoa = req.body.email_pessoa;
            pessoa.save((err) => {
                if(err){
                    res.json({
                        status: "erro",
                        message: "Houve um erro ao atualizar essa pessoa!"
                    });
                }else{
                    res.json({
                        status: "Ok",
                        message: `Pessoa ${pessoa.nome_pessoa} atualizado com sucesso!`
                    });
                }
            });
        }
    });
}

exports.deletarPessoa = (req, res) => {
    let id_pessoa = req.params.id;

    pessoaModel.remove({
        _id: id_pessoa
    }, (err) => {
        if(err){
            res.json({
                status: "erro",
                message: "Houve um erro ao deletar essa pessoa!"
            });
        }else{
            res.json({
                status: "Ok",
                message: `Pessoa deletada com sucesso`
            });
        }
        
    });
}