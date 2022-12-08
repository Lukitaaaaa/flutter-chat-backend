// FUNCION PARA GENERAR LOS JasonWebTokens

const jwt = require("jsonwebtoken"); // INPORTAMOS LA LIBRERIA "jsonwebtoken"


const generarJWT = ( uid ) =>{
       
    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn: '24h' // EL TOKEN DURA 24 HORAS
        }, ( err, token )=> {

            if ( err ){
                //no se pudo cargar el token
                reject('No se pudo generar el JWT');

            } else {
                //se pudo cargar el token
                resolve( token );
            }
        })
    });

}

const comprobarJWT = ( token = '' ) => { // FUNCION PARA VALIDAR EL TOKEN

    try {

        const { uid } = jwt.verify( token, process.env.JWT_KEY ); // VERIFICA EL TOKEN

        return [true, uid];

    } catch ( error ) {
        return [false, null];
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}