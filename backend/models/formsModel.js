const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim:true
    },
    mail: {
        type: String,
        required: true,
        trim:true
    },
    asunto: {
        type: String,
        required: true,
        trim:true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Forms', formSchema, 'forms');