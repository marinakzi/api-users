const mongoose = require('mongoose');
 
mongoose.connect("mongodb://localhost/api-users", 
												{useNewUrlParser: true, 
												 useUnifiedTopology: true, 
												 useCreateIndex: true
												}
			 	).then(()=>{
	console.log("Conectado ao Mongo");
}).catch((err)=>{
	console.log("Erro de conexão com o BD: "+err);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;

