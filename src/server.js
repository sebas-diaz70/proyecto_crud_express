const app = require("./app.js");
const PUERTO = process.env.MIPUERTO || 3003;

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PUERTO}`);
});