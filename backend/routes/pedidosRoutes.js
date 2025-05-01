const express = require('express');
const router = express.Router();
const { procesarPedido } = require('../controllers/pedidosControllers');

router.put('/procesar', procesarPedido);

module.exports = router;
