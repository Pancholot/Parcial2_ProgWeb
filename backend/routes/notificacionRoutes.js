const express = require('express');
const router = express.Router();
const { getNotificaciones } = require('../controllers/notificacionControllers');

router.get('/', getNotificaciones);

module.exports = router;
