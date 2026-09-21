const express = require('express');
require('dotenv').config();

const app = express();

const JsonWebTokenError = require("jsonwebtoken");
//middleware body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PUERTO = process.env.MIPUERTO || 3003;

//importar mis middlewares
const registroMiddleware = require("./src/middleware/registroMiddleware.js");
const manejadorErroresMiddleware = require("./src/middleware/manejadoErroresMiddleware.js");
const autenticacionMiddleware = require("./src/middleware/autenticacionMiddleware.js")
//usuar mis middlewares
app.use(registroMiddleware);


//librerias fs, path
const sistemaArchivos = require("fs");
const ruta = require("path");
const rutaMiArchivo =ruta.join(__dirname, "datos.json");


// importar multer
const multer = require("multer");
//almacenamiento
const almacen=multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "misimagenes/");},
        filename: (req, file, cb) => {
            const extension = ruta.extname(file.originalname);
            cb(null, `${Date.now()}${extension}`);}
    });
//configuracion de almacenamiento para que se suba en el post
    const subir = multer({storage: almacen});
  //validaciones
const { validar } = require("./src/middleware/validaciones/validaciones.js");

//app.get('/', (req, res) => {
    //res.send('API Rest Full con expres');});

app.get('/api/aprendices/', (req, res) => {
   // res.status(200).json({ mensaje: 'Lista Aprendices' });
    sistemaArchivos.readFile(rutaMiArchivo, "utf-8", (error, datos) => {
        if (error)  res.status(500).json({ error: 'no se puede leer el archivo' });
        const listaAprendices = JSON.parse(datos);
        res.status(200).json({ listado: listaAprendices});});

});

// --- RUTA PROTEGIDA (CORREGIDA)---
app.get("/api/protegida",autenticacionMiddleware, (req,res,next)=>{
    res.json({mesaje: "Ruta protegida, acceso con token"});
});

app.post('/api/aprendices/', subir.single("imagen"),validar, (req, res) => {
     const datosAprendiz = req.body;
     datosAprendiz.imagen = req.file?`/misimagenes/${req.file.filename}` : "sin imagen";
     sistemaArchivos.readFile(rutaMiArchivo, "utf-8", (error, datos) => {
        if (error)  res.status(500).json({ error: 'no se puede leer el archivo' });
        const listaAprendices = JSON.parse(datos);
        listaAprendices.push(datosAprendiz);
        sistemaArchivos.writeFile(rutaMiArchivo, JSON.stringify(listaAprendices,null,2), (error) => {
            if (error) res.status(500).json({ error: 'no se puede escribirle file' });
             res.status(200).json({ mensaje: 'Creado', datos: datosAprendiz });});
        });
       
 
    
    
});

app.put('/api/aprendices/:id', (req, res,next) => {
    res.status(200).json({ mensaje: 'actualizar aprendiz' });
});

app.delete('/api/aprendices/:id', (req, res,next) => {
    res.status(200).json({ mensaje: 'eliminar aprendiz' });
});

app.post("/api/inicioSecion", (req,res,next)=>{
    const{usuario,clave}=req.body
    //simular datos de usuario en la DB
    const bdUsuario ={"usuario": "sebas", "clave": "Sena1234"}
    //limpiar datos del usuario en la DB
    if (usuario !==bdUsuario.usuario || clave !==bdUsuario.clave){
        res.json({mensaje: "usuario y/o clave esta incorectas"});

    }
   
    //generar token
    const token=JsonWebTokenError.sign(
        {user: req.usuario},
        process.env.JWT_SECRET,{
            expiresIn: "1h",
        });
        res.json({token});
})

//probocando un error para probar el middleware de manejo de errores
//app.get('/api/error', (req, res, next) => {
//next(new Error("Error de prueba"));
//})
app.use(manejadorErroresMiddleware);
//========================================
//SERVIDOR
//========================================
app.listen(PUERTO, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PUERTO}`);
});