// ALMACENAR A LOS USUARIOS REGISTRADOS
/*

    paht: api/usuarios

*/ 

const { Router } = require('express');
const { getUsuarios } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar_jwt');

const router = Router();

router.get ('/', validarJWT, getUsuarios);

module.exports = router;