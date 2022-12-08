// MODELOS DE USUARIO PARA GRABAR EN LA BASE DE DATOS
// TIENE UN NOMBRE, UN EMAIL, UN PASSWORD Y EL ESTADO DE CONEXION

const { Schema, model } = require('mongoose'); // IMPORTAMOS LA LIBRERIA 'mongoose'

const UsuarioSchema = Schema({ //SCHEMA NOS AYDARA A CREAR EL MODELO

    nombre: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object; 
})

module.exports = model('Usuario', UsuarioSchema); // EXPORTAMOS EL MODELO Y EL ESQUEMA