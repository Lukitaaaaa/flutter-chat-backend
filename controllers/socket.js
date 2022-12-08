// CONTROLADOR DE LAS FUNCIONES DE LA COMUNICACION POR SOCKETS

const Usuario = require ( '../models/usuario' ); // IMPORTAMOS LOS MODELOS DE LOS USARIOS Y LOS MENSAJES
const Mensaje = require ('../models/mensaje');


const usuarioConectado = async ( uid = '' ) => { // FUNCION DE CUANDO EL USUARIO SE CONECTA

    const usuario = await Usuario.findById( uid ); // BUSCA EL UID
    usuario.online = true; // SI ESTA EN ONLINE

    await usuario.save(); // ACTUALIZA EL ESTADO DE CONEXION DEL USUARIO EN LA BASE DE DATOS

    return usuario 
}

const usuarioDesconectado = async ( uid = '' ) => { // FUNCION DE CUANDO EL USUARIO SE DESCONECTA

    const usuario = await Usuario.findById( uid ); 
    usuario.online = false; // SI ESTA EN OFFLINE

    await usuario.save(); // ACTUALIZA EL ESTADO DE CONEXION DEL USUARIO EN LA BASE DE DATOS

    return usuario 
}

const grabarMensaje = async ( payload ) => { // FUNCION PARA ALMACENAR LOS MENSAJES EN LA BASE DE DATOS

    /* 
        payload{
            de:'',
            para:''
            texto:''
        }
    */

    try {

        const mensaje = Mensaje( payload ); // RECIBE EL MENSAJE
        await mensaje.save(); // LO ALMACENA EN LA BASE DE DATOS

        return true;

    } catch (error) {
        console.log(error)
        return false;
    }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}