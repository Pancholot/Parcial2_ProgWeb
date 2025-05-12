const express = require('express');
const router = express.Router();
const {getProductos, createProducto, updateProducto, deleteProducto} = require('../controllers/productosControllers');
const {protect, soloAdmin} = require('../middleware/protection');
router.route('/')
    .get(getProductos)
    .post(protect, soloAdmin, createProducto);

router.route('/:sku')
    .put( protect, soloAdmin, updateProducto)
    .delete( protect, soloAdmin, deleteProducto);

module.exports = router;
