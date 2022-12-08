// FUNCION PARA VALIDAR EL JasonWebToken

const jwt = require('jsonwebtoken'); // IMPORTAMOS LA LIBRERIA 'jsonwebtoken'

const validarJWT = ( req, res, next )=> {

    //Leer el token
    const token = req.header('x-token'); // EXTRAEMOS EL HEADER DEL TOKEN

    if ( !token ) { // SI NO HAY UN TOKEN
        return res.status(401).json({ // DEVUELVE ESTE ERROR
            ok:false,
            msg: 'No hay un token'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_KEY ); // VERIFICA EL TOKEN
        req.uid = uid;

        next(); // SI ES VALIDO, VERIFICA EL SIGUIENTE

    } catch ( error ) { // SI NO ES VALIDO DEVUELVE ESTE ERROR
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    
}

module.exports = {
    validarJWT
}