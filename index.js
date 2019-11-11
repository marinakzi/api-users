// Carregando módulos
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
 
// Carregando funções
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());	

// Carregando controllers
require("./controllers/authController")(app);
require("./controllers/userController")(app);	
 
// Iniciando servidor
const PORT = 3333;
app.listen(PORT, ()=>{
	console.log("Servidor iniciado...");
});	
 