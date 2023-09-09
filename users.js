const express = require("express");
const router = express.Router()
const Users = require('../../models/user');
const bcrypt = require('bcrypt');

router.get("/", async (req,res)=>{
	try{
		const users = await Users.find({})
	    return res.send(users)
	}catch(error){
		return res.status(500).send({error: 'Erro ao consultar Usuario'})
	}

});
router.post('/create', async (req,res)=>{
	const { email, password } = req.body;
	if(!email || !password) return res.send({ error: "Dados insuficientes!"});
	try{
		if(await Users.findOne({ email })) return res.send({error: 'Usuario já registrado!'});
		const user = await Users.create(req.body);
		user.password = undefined;
		return res.send(user);
	}catch(error){
		return res.send({error: "Erro ao buscar usuario!"})
	}
})

router.post('/auth', async (req,res)=>{
	const { email, password } = req.body;
	try{
		if(!email || !password) return res.send({error: 'Dados insuficientes!'});
		const user = await Users.findOne({email}).select('+password');
		if(!user) return res.send({error: "Usuario nao registrado!"});
		const auth_ok = await bcrypt.compare(password, user.password)
		if(!auth_ok) return res.send({error: 'Erro ao autenticar usuario!'});
		user.password = undefined;
		return res.send(user);
	}catch(error){
		console.log(error)
		return res.send({error: "Erro ao buscar usuario!"})
	}
})
module.exports = router;
