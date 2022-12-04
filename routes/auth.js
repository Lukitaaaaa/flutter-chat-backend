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
    check('nombre','el nombre tiene que ser obligatorio').not().isEmpty(), 
    check('password','la contraseña tiene que ser obligatoria').not().isEmpty(),
    check('email','el email tiene que ser obligatorio').not().isEmpty(),
    check('email','este email no es valido').isEmail(),
    validarCampos
] , crearUsuario);

router.post('/', [
    check('password','la contraseña tiene que ser obligatoria').not().isEmpty(),
    check('email','el email tiene que ser obligatorio').not().isEmpty(),
    check('email','este email no es valido').isEmail(),
], login);



router.get ('/renew', validarJWT, renewToken);

module.exports = router;