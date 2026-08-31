const express = require('express');
require('dotenv').config();

const app = express();

const PUERTO = process.env.MIPUERTO || 3003;
//middleware body parser
app.use(express.json());
app.get('/', (req, res) => {
    res.send('API Rest Full con expres');
});

app.get('/api/aprendices', (req, res) => {
    res.status(200).json({ mensaje: 'Lista Aprendices' });
});

app.post('/api/aprendices', (req, res) => {
    const datosAprendiz = req.body;
    const edad=req.body.edad;
   
     if (edad >= 18) {

        res.status(201).json({
            mensaje: 'El aprendiz es mayor de edad',
            datos: datosAprendiz
        });

    } else {

        res.status(201).json({
            mensaje: 'El aprendiz es menor de edad',
            datos: datosAprendiz
        });
    };
    res.status(201).json({ mensaje: 'crear aprendiz' });
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