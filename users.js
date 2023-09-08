const express = require("express");
const router = express.Router()
const Users = require('../../models/user');

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
module.exports = router;