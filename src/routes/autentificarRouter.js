//consolida o agrega todoslos enrutadores
const{Router}=require("express");

const enrutadorAuth=Router();
//importaciones del controlador
const {iniciarSesion,registrarse}=require("../controllers/autentificarController");
//Ruta de registro en el sistema
enrutadorAuth.post("/registro", registrarse);
//Ruta de inicio de sesion en el sistema
enrutadorAuth.post("/login", iniciarSesion);

//se realiza todas las rutas,con (post, put,delete)

module.exports=enrutadorAuth;
