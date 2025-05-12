const mongoose = require('mongoose');

const notificacionSchema = mongoose.Schema({
    productoSku: {
        type: String, 
        required: true, 
        trim: true },
    mensaje: { 
        type: String, 
        required: true },
    fecha: { 
        type: Date, 
        default: Date.now },
    atendido: { 
        type: Boolean, 
        default: false }
});

module.exports = mongoose.model('Notificacion', notificacionSchema, 'notificaciones');
