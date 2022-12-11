const { Schema, model } = require('mongoose');

const NoticiasSchema = Schema({

    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

NoticiasSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    return object;
})

module.exports = model('Noticia', NoticiasSchema);