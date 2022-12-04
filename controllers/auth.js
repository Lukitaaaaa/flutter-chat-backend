const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const { findOne } = require("../models/usuario");


const crearUsuario = async (req, res = response)=> {

    const { email, password } = req.body;

    try{

        const existeEmail = await Usuario.findOne({ email:email });

        if( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync(); //salt sirve para generar caracteres de manera aleatoria para incriptar la contraseña 
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // Generar mi JWT

        const token = await generarJWT( usuario.id );
        
        res.json({
            ok: true,
            usuario,
            token
        });

    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con su vieja'
        });
    }
}

const login = async (req , res = response) => {

    const { email,password } = req.body;

    try{

        const usuarioDB = await  Usuario.findOne({ email });
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok:false,
                mgs: 'Email no encontrado'
            });
        }

        // Validar el password
        const validarPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validarPassword ) {
            return res.status(400).json({
                ok:false,
                mgs: 'La contraseña no es valida'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
        
            ok:false,
            msg: 'Habla con alguien nose'
        })
    }
}

const renewToken = async( req, res = response ) => {

    const uid = req.uid;

    const token = await generarJWT( uid );

    const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        usuario,
        token
    })
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}