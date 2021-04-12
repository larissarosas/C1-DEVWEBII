const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');

const pessoaRouter = require('../src/routes/pessoa-routes');
const unidadeSaudeRouter = require('../src/routes/unidade-saude-routes');
const agendamentoRouter = require('../src/routes/agendamento-routes');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use('/api/pessoa/', pessoaRouter);
app.use('/api/unidadesaude/', unidadeSaudeRouter);
app.use('/api/agendamento/', agendamentoRouter);

mongoose.connect('mongodb://root:faesa123@localhost/projeto_c1?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no Mongo'));
db.once('open', function() {
    console.log('Conseguir conectar no banco');
});

const port = 5000;
const hostname = 'localhost';

app.get('/', function(req, resp){
    resp.send('Servidor funcionando corretamente..........')
});

app.listen(port, hostname, ()=>{
    console.log(`Servidor rodando no endereço: https://${hostname}:${port}`);
});