const express = require("express");
const jwt = require("jsonwebtoken");

const authMiddleware = require("../middleware/auth");
const User = require("../models/Users");
const authConfig = require("../config/auth");

const router = express.Router(); 

router.use(authMiddleware); 

function generateToken(params={}){
	return jwt.sign(params, authConfig.secret, {
		expiresIn: 86400 
	});
}

// retorna usuário de acordo com ID enviado
router.get("/user/:user_id", async (req, res)=>{

	User.findOne({_id: req.params.user_id}).then((user)=>{ 

		res.send({user: user});	  

	}).catch((err)=>{
		return res.status(400).send({error: "Usuário não localizado."}); 
	});  
});

// retorna todos os usuários
router.get("/users", async (req, res)=>{ 

	const dataUser = await User.find();
 	res.send({user: dataUser});	  
 
});

// criar novo usuário
router.post('/user', async (req, res)=>{
	const {email} = req.body;
	try{
		if(await User.findOne({email}))
			return res.status(400).send({error: "E-mail já cadastrado."});

		req.body.admin = 0;
		
		const user = await User.create(req.body);

		user.password = undefined;

		return res.send({
			user,
			token: generateToken({id: user.id})
		});
	}
	catch(err){ 
		return res.status(400).send({error: "Falha ao cadastrar usuário."}); 
	}
});

// editar usuário de acordo com ID enviado
router.patch("/user/:user_id", async (req, res)=>{
 
 	User.updateOne({_id  : req.params.user_id}, {$set: req.body}).then((user)=>{ 

		return res.status(200).send({error: "Usuário alterado com sucesso."});   

	}).catch((err)=>{
		return res.status(400).send({error: "Falha ao editar usuário."}); 
	});  
 
});

// excluir usuário de acordo com ID enviado
router.delete("/user/:user_id", async (req, res)=>{

	if(req.userId==req.params.user_id){

		return res.status(400).send({error: "Falha ao excluir usuário."});

	}else{
		User.deleteOne({_id  : req.params.user_id}).then((user)=>{ 

			return res.status(200).send({error: "Usuário excluído com sucesso."});   

		}).catch((err)=>{
			return res.status(400).send({error: "Falha ao excluir usuário."}); 
		});
	}
 
	  
 
});

module.exports = app => app.use('/', router);
