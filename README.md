## API de usuários ##
CRUD de usuários, autenticação e geração de token (JWT)

# Servidor iniciado na porta: 3333
# Banco de dados criado: api-users

// Iniciar aplicação
nodemon index.js


______________________________________________________________ 
// Login com email e password e retornar um token de acesso

POST => http://localhost:3333/login

BODY =>
{   
  	"email": "admin@teste.com",
  	"password": "123456"  
}
 

______________________________________________________________
// Rota para autenticar o token de acesso retornando os dados do usuário

GET => http://localhost:3333/me

HEADERS =>
authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzljYzljOTMzN2NhMjlhY2EwNTUyOSIsImlhdCI6MTU3MzUwNjc5MSwiZXhwIjoxNTczNTkzMTkxfQ.lBFnHRdaHISqyGG9S4Ov14fPTxIzvpB-5arikOqXdXo


______________________________________________________________
// Buscar os dados de um usuário em especifico

GET => http://localhost:3333/user/5dc9da2b31528f0448808bcc
 

______________________________________________________________
// Buscar a lista de usuários

GET => http://localhost:3333/users
 

______________________________________________________________
// Adicionar um novo usuário

POST => http://localhost:3333/user
 
BODY =>
{
	"name": "admin",
  	"email": "admin@teste.com",
  	"password": "123456" 
}


______________________________________________________________
// Edita um usuário

PATCH => http://localhost:3333/user/5dc9da1231528f0448808bca

BODY =>
{
  "name": "Marina Kz" 
}


______________________________________________________________
// Remove um usuário

DELETE => http://localhost:3333/user/5dc9da6431528f0448808bcf





 

