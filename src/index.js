
//Arquivo para criar porta de navegacao
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('../src/routes');
const cors = require('cors');

mongoose.connect('mongodb+srv://MarciaCorte:13086978Mc.@cluster0-ajwcd.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const whitelist =  ['http://localhost:4000/devs', 'http://localhost:3000'];

app.use(
    cors({
        origin: whitelist,
        methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    }),
);

//Aceitar requisicoes no formato request.body-->
app.use(express.json());
app.use(routes);

//Liberando acesso externo para costura com o front
app.use(cors());

app.listen(4000);


//Comentarios

//Metodos HTTP: GET, PUT, POST, DELETE

//Tipos de parametros:
//Query Params:request.query(Filtros, ordenaçao,paginaçao....)
//Route Params:request.params(Identificar um recurso na alteracao ou remocao)
//Body Params:request.body(Dados para criaçao ou alteraçao de um registro)
//Mongo-DB: Nao Realcional

module.exports= {app, mongoose};