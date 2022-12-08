// AUTENTICACION 
// AQUI SE CREAN Y SE LOGEAN LOS USUARIOS, Y ADEMAS SE RENUEVA EL TOKEN 

/*

    paht: api/login

*/ 

const { Router } = require('express');
const { check } = require('express-validator'); 

const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');

const router = Router();

router.post('/new', [
    check('nombre','el nombre tiene que ser obligatorio').not().isEmpty(), //VERIFICACION DE NOMBRE
    check('password','la contraseña tiene que ser obligatoria').not().isEmpty(), //VERIFICACION DEL PASSWORD
    check('email','el email tiene que ser obligatorio').not().isEmpty(), // VERIFICACION DEL EMAIL
    check('email','este email no es valido').isEmail(), // CORRECCION DEL EMAIL
    validarCampos // MIDDLEWARE
] , crearUsuario); // CREA EL USUARIO

router.post('/', [
    check('password','la contraseña tiene que ser obligatoria').not().isEmpty(), //VERIFICACION DEL PASSWORD
    check('email','el email tiene que ser obligatorio').not().isEmpty(), // VERIFICACION DEL EMAIL
    check('email','este email no es valido').isEmail(), // CORRECCION DEL EMAIL
], login); // HACE EL LOGIN



router.get ('/renew', validarJWT, renewToken);

module.exports = router;