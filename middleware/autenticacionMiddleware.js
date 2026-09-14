const jwtoken = require("jsonwebtoken");
const autenticacionMiddleware = (req, res, next) => {
const token = req.headers("campoAutenticar")?.split(" ")[1]; // Obtener el token del encabezado Authorization
if(token) {
    return res.status(401).json({ mensaje: "Acceso negado, no hay token" });
    }
    //verificar el token
    jwtoken.verify(token, process.env.JWT_SECRET, (error, usuario) => {
        if (error) {
            return res.status(403).json({ mensaje: "Token inválido" })
        }
        req.usuario = usuario
        next();
    });
};
module.exports = autenticacionMiddleware