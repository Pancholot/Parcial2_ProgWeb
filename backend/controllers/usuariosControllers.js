const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuariosModel');
const generarToken = require('../utils/generarToken');

const registrarUsuario = asyncHandler(async (req, res) => {
  const { nombre, correo, contraseña, direccion, esAdmin } = req.body;

  const existe = await Usuario.findOne({ correo });
  if (existe) {
    res.status(400);
    throw new Error('El usuario ya existe');
  }

  const hashedPassword = await bcrypt.hash(contraseña, 10);

  const usuario = await Usuario.create({
    nombre,
    correo,
    contraseña: hashedPassword,
    direccion,
    esAdmin: esAdmin || false,
  });

  res.status(201).json({
    _id: usuario._id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    direccion: usuario.direccion,
    esAdmin: usuario.esAdmin,
    token: generarToken(usuario._id),
  });
});

const loginUsuario = asyncHandler(async (req, res) => {
  const { correo, contraseña } = req.body;

  const usuario = await Usuario.findOne({ correo });
  if (usuario && (await bcrypt.compare(contraseña, usuario.contraseña))) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      direccion: usuario.direccion,
      esAdmin: usuario.esAdmin,
      token: generarToken(usuario._id),
    });
  } else {
    res.status(401);
    throw new Error('Credenciales inválidas');
  }
});

module.exports = { registrarUsuario, loginUsuario };