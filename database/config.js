// CONFIGURACION DE LA BASE DE DATOS

const mongoose = require("mongoose"); // IMPORTAMOS MONGOOSE

const dbConnection = async() => { // FUNCION ENCARGADA DE LA CONEXION

    try {

        await mongoose.connect( process.env.DB_CONNECTION, {});

        console.log('DB Online')

    } catch ( error ) {
        console.log(error);
        throw new Error('Error en la base de datos ');
    }
}

module.exports = { // EXPORTAMOS LA FUNCION
    dbConnection
}