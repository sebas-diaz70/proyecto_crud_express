//nombre mayor de tres letras
//correo expreg
//id:



function validarNombre(nombre) {
    const expresionNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{3,}$/;

    return expresionNombre.test(String(nombre || "").trim());
}


// Correo: validación mediante expresión regular.
function validarCorreo(correo) {
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegular.test(correo);
}

// ID: solamente números.
function validarId(id) {
    const expresionId = /^\d+$/;

    return expresionId.test(String(id || "").trim());
}


// Clave: mínimo 4 caracteres.
function validarClave(clave) {
    return String(clave || "").trim().length >= 4;
}


// Middleware para validar el formulario.
function validar(req, res, next) {

    const { nombre, correo, id, clave } = req.body;


    // Validar nombre
    if (!validarNombre(nombre)) {
        return res.status(400).json({
            error: "El nombre debe tener mínimo 3 letras."
        });
    }


    // Validar correo
   if (!validarCorreo(correo)) {
        return res.status(400).json({
            error: "El correo no tiene un formato válido"
        });
    }


    // Validar ID solamente si viene en el formulario
    if (id !== undefined && !validarId(id)) {
        return res.status(400).json({
            error: "El ID debe contener solamente números."
        });
    }


    // Validar clave
    if (!validarClave(clave)) {
        return res.status(400).json({
            error: "La clave debe tener mínimo 4 caracteres."
        });
    }


    // Si todo está correcto, continúa con el POST
    next();
}


module.exports = {
    validarNombre,
    validarCorreo,
    validarId,
    validarClave,
    validar
};