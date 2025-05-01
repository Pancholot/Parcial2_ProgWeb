const asyncHandler = require('express-async-handler');
const Producto = require('../models/productosModel');

const getProductos = asyncHandler(async (req, res) => {
    const productos = await Producto.find();
    res.status(200).json(productos);
});

const createProducto = asyncHandler(async (req, res) => {
    const { sku, nombre, precio, cantidad, imagenUrl } = req.body;

    if (!sku || !nombre || !precio || !cantidad || !imagenUrl) {
        res.status(400);
        throw new Error('Faltan campos obligatorios');
    }

    const nuevoProducto = await Producto.create({
        sku, nombre, precio, cantidad, imagenUrl
    });
    res.status(201).json(nuevoProducto);
});

const updateProducto = asyncHandler(async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
        res.status(404);
        throw new Error('Producto no encontrado');
    }

    const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(productoActualizado);
});

const deleteProducto = asyncHandler(async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
        res.status(404);
        throw new Error('Producto no encontrado');
    }

    await producto.deleteOne();
    res.status(200).json({ id: req.params.id });
});

module.exports = { getProductos, createProducto, updateProducto, deleteProducto};
