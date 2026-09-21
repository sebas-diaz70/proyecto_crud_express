//consolida o se agrega todoslos enrutadores
const {Router}=require("express");
const enrutadorGeneral=Router();
const enrutadorPrueba = require("./pruebaRouter.js");

enrutadorGeneral.use("/rutaprueba", enrutadorPrueba);

module.exports=enrutadorGeneral;
