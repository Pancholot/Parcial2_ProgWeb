const express = require('express');
const router = express.Router();
const {getProductos, createProducto, updateProducto, deleteProducto} = require('../controllers/productosControllers');

router.route('/')
    .get(getProductos)
    .post(createProducto);

router.route('/:id')
    .put(updateProducto)
    .delete(deleteProducto);

module.exports = router;
