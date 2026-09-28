//consolida o se agrega todoslos enrutadores
const {Router}=require("express");
const enrutadorGeneral=Router();
const enrutadorPrueba = require("./pruebaRouter");
//importar enrutadorAuth
const enrutadorAuth = require("./autentificarRouter");

enrutadorGeneral.use("/rutaprueba", enrutadorPrueba);
enrutadorGeneral.use("/autenticar", enrutadorAuth);

module.exports=enrutadorGeneral;
