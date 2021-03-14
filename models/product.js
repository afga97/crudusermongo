const { Schema, model } = require('mongoose');

const productsSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es obligatorio']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es requerido']
    },
    precio: {
        type: Number,
        default: 0,
    },
    categorie: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: [true, 'La categoria es obligatoria']
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
    },
})

module.exports = model('Product', productsSchema);