// FUNCION PARA VALIDAR CAMPOS

const { validationResult } = require('express-validator');

const validarCampos = (req, res, next)=> {

    const errores = validationResult( req ); // REVISA LOS ERRORES

    if( !errores.isEmpty() ){ // SI EL CAMPO ESTA VACIO
        return res.status(400).json({
            ok: false,
            errors: errores.mapped() // LiSTA DE ERRORES
        });
        
    }

    next(); // PASA AL SIGUIENTE CAMPO
}

module.exports = {
    validarCampos
}