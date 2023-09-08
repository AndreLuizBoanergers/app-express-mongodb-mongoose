const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const porta = process.env.PORT;
const app = express();
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//MONGOOSE
const url =  `mongodb://127.0.0.1:27017/baseMongodb`;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', ()=>{
	console.log('Conexão com o MongoDB estabelecida');
});
mongoose.connection.on('error', (err)=>{
	console.log('Erro na conexao com banco de dados:' + err);
});
mongoose.connection.on('disconnected', ()=>{
	console.log("Aplicasao desconectada do banco de dados!");
});
///
//BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
///
///ROTAS
const index = require("./public/routes/index.js");
const login = require("./public/routes/login.js");
const users = require("./public/routes/users.js");

app.use("/",index);
app.use("/login",login);
app.use("/users",users);
///
app.listen(porta || 3000,console.log("Servidor Rodando!"));
