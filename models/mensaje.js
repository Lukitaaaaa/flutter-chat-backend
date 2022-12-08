// MODELO Y ESQUEMA DEL MENSAJE
// TIENE COMO ITEM EL USUARIO QUE LO ENVIA, EL USUARIO QUE LO RECIBE Y UN TEXTO

const { Schema, model } = require('mongoose'); // IMPORTAMOS LA LIBRERIA 'mongoose'

const MensajeSchema = Schema({ //SCHEMA NOS AYDARA A CREAR EL MODELO

    
    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    msg: {
        type: String,
        required: true
    },
    
}, {
    timestamps: true
});

MensajeSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    return object; 
})

module.exports = model('Mensaje', MensajeSchema);