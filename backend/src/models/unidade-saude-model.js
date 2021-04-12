const mongoose = require('mongoose');

const unidadeSaudeSchema = mongoose.Schema({
    nome_unidade:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    descricao_unidade:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    endereco_unidade:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    telefone_unidade:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    email_unidade:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    latlong_unidade:{
        type: mongoose.Schema.Types.String,
        required: false
    },
    pessoa: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'pessoa',
        require: false,
    }]

});

let UnidadeSaude = module.exports = mongoose.model('unidade-saude', unidadeSaudeSchema);
module.exports.get = function(callback, limit){
    UnidadeSaude.find(callback).limit(limit);
}