const iniciarSesion = async (req, res) => { 
   
//simular bd de un usuario registrado
    const userBd = {usuario: "sebas",clave: "123"};
    try {
         const {usuario, clave} = req.body
        if(userBd.usuario === usuario ||  userBd.clave !== clave){
            res.json({mensaje: "Credenciales incorrectas"});
        }
        res.json({mensaje: "Usuario Bienvenido"});
    } catch (error) {
        res.json({error: error });
    }
}

const registrarse = async (req, res) => {
    try {
        const datos = req.body
        res.json({datosRegistrados: datos});
    } catch (error) {
        res.json({error: error });
    }
}

module.exports =  { iniciarSesion, registrarse };