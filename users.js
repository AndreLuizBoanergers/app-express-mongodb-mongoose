const express = require("express");
const router = express.Router()
const Users = require('../../models/user');
const bcrypt = require('bcrypt');

router.get("/",async (req,res)=>{
	try{
		const data = await Users.find({})
	    return res.send({message:"Rota users metodo GET OK"})
	}catch(error){
		return res.status(500).send({error: 'Erro ao consultar Usuario'})
	}

});

router.post('/create', async (req,res)=>{
	const { email, password } = req.body;
	try{
		const data = await Users.findOne({email});
		if(data) return res.send({error: `Usuario já registrado!`});
		const dataUser =  await Users.create(req.body);
		if(dataUser){
			dataUser.password = undefined;
			return res.status(200).send({dataUser});
		} 
	}catch(error){
		return res.send({error: 'Erro ao criar usuario, se o erro persistir entre em contato com o administrador!'});
	}
})

router.post('/auth', async (req,res)=>{
	const { email, password} = req.body;
	try{
		if(!email || !password) return res.send({error: 'Dados insuficientes!'});
		const dataAuth = await Users.findOne({email}).select('+password');
		if(!dataAuth) return res.send({error: "Usuario nao registrado!"});
		bcrypt.compare(password, dataAuth.password, (err,same)=>{
			if(!same) return res.send({error: 'Erro ao autenticar usuario! verifique seu usuario e senha'});
			return res.send(dataAuth)
		})
	}catch(e){
		return res.send({error: 'Erro ao autenticar usuario!'})
	}
})
module.exports = router;
