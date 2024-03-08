const { Schema, model, default: mongoose } = require('mongoose');

const productoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    precio: {
        type: String,
        required: [true, 'El precio es obligatorio']
    },
    cantidad: {
        type: String,
        required: [true, 'La cantidad es obligatoria'],
        nique: true
    },
    fechaVencimiento: {
        type: String,
        required: [true, 'La fecha de vencimiento es obligatoria'],
        nique: true
    },
    categoria: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    }],
    estado: {
        type: Boolean,
        default: true
    },
});

module.exports = model ('Procucto', productoSchema);