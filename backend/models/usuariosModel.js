const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    contraseña: {
      type: String,
      required: true,
    },
    direccion:{
        type:String,
        required:true,
        trim: true
    },
    esAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Usuario', usuarioSchema, 'usuarios');
