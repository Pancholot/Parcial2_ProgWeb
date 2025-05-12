const asyncHandler = require('express-async-handler');
const Notificacion = require('../models/notificacionModel');

const getNotificaciones = asyncHandler(async (req, res) => {
    const notificaciones = await Notificacion.find();
    res.status(200).json(notificaciones);
});

module.exports = { getNotificaciones };