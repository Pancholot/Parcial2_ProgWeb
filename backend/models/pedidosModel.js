const mongoose = require('mongoose');

const pedidoSchema = mongoose.Schema({
    productos: [
        {
            sku: {
                type: String,
                required: true,
                trim: true
            },
            cantidad: {
                type: Number,
                required: true, 
                trim: true
            }
        }
    ],
}, {
    timestamps: true
});

module.exports = mongoose.model('Pedido', pedidoSchema, 'pedidos');