// path: /api/noticia

const { Router } = require('express');
const { check } = require ( 'express-validator' );
const { getNoticias } = require('../controllers/noticia');
const { guardarNoticia } = require('../controllers/socket');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();


router.post('/new', [
    check('titulo', 'Name requerido').not().isEmpty(),
    check('autor', 'autor requerido').not().isEmpty(),
    check('descripcion', 'Desc requerido').not().isEmpty(),
    validateFields
], guardarNoticia);

router.get('/', getNoticias);

module.exports = router;