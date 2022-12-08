// CONTROLADOR DE LA FUNCION DE LA LISTA DE LOS USUARIOS

const { response } = require("express"); // IMPORTAMOS LA LIBRERIA 'express'
const Usario = require('../models/usuario'); // "      EL MODELO DEL USUARIO

const getUsuarios = async (req, res = response) => {

    const desde = Number ( req.query.desde ) || 0;

    const usuarios = await Usario // Lista de usuarios registrados
      .find({ _id: {$ne: req.uid} }) // filtro para que no retorne la id en donde estes conectado, para que una persona no se pueda comunicar consigo misma 
      .sort('-online') // es para que muestre primero a los usuarios que estan conectados  y a los que estan desconectados en lo mas bajo de la lista
      .skip(desde)
      .limit(20)
      
    res.json({
        ok:true,
        usuarios
    })

}

module.exports = {
    getUsuarios
}