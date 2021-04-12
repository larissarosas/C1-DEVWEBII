const mongoose = require('mongoose');

const agendamentoSchema = mongoose.Schema({
    pessoa_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pessoa',
        require: true
    },
    unidade_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'unidade-saude',
        require: true
    },
    data_hora_agendamento:{
        type: mongoose.Schema.Types.Date,
        required: false
    },
    necessidades_especiais:{
        type: mongoose.Schema.Types.Boolean,
        required: true
    },
    observacoes_agendamento:{
        type: mongoose.Schema.Types.String,
        required: false
    }
});

let Agendamento = module.exports = mongoose.model('agendamento', agendamentoSchema);

module.exports.get = function(callback, limit){
    Agendamento.find(callback).limit(limit);
}