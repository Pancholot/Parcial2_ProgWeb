const mongoose = require('mongoose');

const productoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim:true
    },
    precio: {
        type: Number,
        required: true,
        trim:true
    },
    imagenUrl: {
        type: String,
        required: true,
        trim:true
    },
    sku:{
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    cantidad: {
        type: Number,
        required: true,
        trim:true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Producto', productoSchema, 'productos');