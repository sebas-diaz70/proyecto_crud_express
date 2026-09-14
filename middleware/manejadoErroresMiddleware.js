const manejadorErroresMiddleware = (error, req, res, next) => {
   const codigoError = error.statusCode || 500;
   const mensajeError = error.message || "Fallo en el servidor";
    
   console.error(`[Error]:${new Date().toISOString()} - ${req.method} - ${req.url}- ${req.ip}`);
   //valar si hay mas informacion
   if (error.stack) {
       console.error(error.stack);
   }
   res.json({ Error: "Error", codigoError,  mensajeError,
    //configurar .env, para mostrar errores solo en modo development
    ...(process.env.
        NODE_ENV=== "development" && 
         {stack: error.stack })

    })
   next()
}

module.exports = manejadorErroresMiddleware