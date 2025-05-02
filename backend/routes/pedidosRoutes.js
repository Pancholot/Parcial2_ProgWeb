const express = require('express');
const router = express.Router();
const {getPedidos, procesarPedido } = require('../controllers/pedidosControllers');

router.route('/')
    .get(getPedidos)
    .put(procesarPedido);

module.exports = router;
