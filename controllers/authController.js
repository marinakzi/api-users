const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
 
const authConfig = require("../config/auth");
const User = require("../models/Users");

const router = express.Router(); 

function generateToken(params={}){
	return jwt.sign(params, authConfig.secret, {
		expiresIn: 86400 
	});
}
 
// recebe email e password e devolve o token para autenticação 
router.post("/login", async (req, res)=>{
	const {email, password} = req.body;
	const user = await User.findOne({email}).select("+password"); 

	if(!user)
		return res.status(400).send({error: "Usuário não encontrado."}); 

	if(!await bcrypt.compare(password, user.password)) 
		return res.status(400).send({error: "Senha inválida."});	

	user.password = undefined;
 
	res.send({token: generateToken({id: user.id})}); 	
});
 
// recebe token de autenticação e devolve dados do usuário
router.get("/me", async (req, res)=>{ 
	const authHeader = req.headers.authorization;
  	const parts = authHeader.split(" ");
 	const [scheme, token] = parts;
 
	jwt.verify(token, authConfig.secret, (err, decoded)=>{
		if(err)
			return res.send({error: "Token inválido"});
		
		req.userId = decoded.id;
 	});

 	const dataUser = await User.findOne({_id:req.userId}); 
 	res.send({user: dataUser});	  
});

module.exports = app => app.use('/', router);