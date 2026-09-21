//consolida o agrega todoslos enrutadores
const{Router}=require("express");

const enrutadorPrueba=Router();

enrutadorPrueba.get("/rutaPersona",(req,res)=>{
    res.json({mensaje: "Ruta de prueba, persona"});
});

//se realiza todas las rutas,con (post, put,delete)

module.exports=enrutadorPrueba;
