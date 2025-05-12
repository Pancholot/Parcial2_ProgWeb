const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuariosModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decodificado = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = await Usuario.findById(decodificado.id).select('-contraseña');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Token inválido');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('No autorizado, sin token');
  }
});

const soloAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.esAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error('Acceso denegado: solo administradores');
  }
};

module.exports = { protect, soloAdmin };
