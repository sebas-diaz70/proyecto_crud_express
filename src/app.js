require("dotenv").config();
const express = require("express");
const enrutadorGeneral = require("./routes/index.js");
const app = express();
//importar middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//debemos inportr todo los enrutadores de la carpeta router
app.use("/api", enrutadorGeneral);

//enpoint de raiz de bienvenida a la Api
app.get("/", (req, res) => {
    res.json({ mensaje: "API Rest 3407182 en funcionamiento" });
});

module.exports = app;