const { validationResult } = require('express-validator');

const validateFields = (req, res, next) =>{
    const _errors = validationResult(req);

    if(!_errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: _errors.mapped()
        });
    }

    next();
}


module.exports = {
    validateFields
}