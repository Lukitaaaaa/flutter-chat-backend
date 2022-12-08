// CONTROLADOR DE LA FUNCION PARA RETORNAR TODOS LOS MENSAJES

const Mensaje = require('../models/mensaje'); // IMPORTAMOS EL MODELO DE LOS MENSAJES

const obtenerChat = async( req, res ) => { 
    const miID = req.uid;
    const mensajesDe = req.params.de;

    const last30 = await Mensaje.find({ // BUSCA LOS ULTIMOS 30 MENSAJES
        $or:[{de: miID, para: mensajesDe}, { de: mensajesDe, para: miID }] // CONDICION DE LOS MENSAJES CON EL USUARIO QUE LO ENVIA Y EL QUE LO RECIBE
    })
    .sort({ createdAt: 'desc' }) // MUESTRA LOS ULTIMOS MENSAJES ENVIADOS
    .limit(30);

    res.json({
        ok: true,
        mensajes: last30
    })

}

module.exports = {
    obtenerChat
}