const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const User = require("../models/Users");

module.exports = (req, res, next) =>{
	const authHeader = req.headers.authorization;

	if(!authHeader)
		return res.status(403).send({error: "Token não informado."});

	const parts = authHeader.split(" ");

	if(!parts.length === 2)
		return res.status(403).send({error: "Erro no token."});

	const [scheme, token] = parts;
	
	if(!/^Bearer$/i.test(scheme))
		return res.status(403).send({error: "Token incorreto"});

	jwt.verify(token, authConfig.secret, async (err, decoded)=>{
		if(err)
			return res.status(403).send({error: "Token inválido"});
		
		req.userId = decoded.id; 

		if(await User.findOne({_id:req.userId}))  
 			return next();
 		else
 			return res.status(403).send({error: "Token revogado."}); 

		
	});
}; 