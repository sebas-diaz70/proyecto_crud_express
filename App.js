const express = require('express');
require('dotenv').config();

const app = express();

//middleware body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PUERTO = process.env.MIPUERTO || 3003;
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
  

//app.get('/', (req, res) => {
    //res.send('API Rest Full con expres');});

app.get('/api/aprendices', (req, res) => {
   // res.status(200).json({ mensaje: 'Lista Aprendices' });
    sistemaArchivos.readFile(rutaMiArchivo, "utf-8", (error, datos) => {
        if (error)  res.status(500).json({ error: 'no se puede leer el archivo' });
        const listaAprendices = JSON.parse(datos);
        res.status(200).json({ listado: listaAprendices});});

});

app.post('/api/aprendices', subir.single("imagen"), (req, res) => {
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

app.put('/api/aprendices/:id', (req, res) => {
    res.status(200).json({ mensaje: 'actualizar aprendiz' });
});

app.delete('/api/aprendices/:id', (req, res) => {
    res.status(200).json({ mensaje: 'eliminar aprendiz' });
});

app.listen(PUERTO, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PUERTO}`);
});