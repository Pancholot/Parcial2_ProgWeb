const asyncHandler = require('express-async-handler');
const Producto = require('../models/productosModel');
const Notificacion = require('../models/notificacionModel');
const { emailSender } = require('../config/email');

const getProductos = asyncHandler(async (req, res) => {
    const productos = await Producto.find();
    res.status(200).json(productos);
});

const createProducto = asyncHandler(async (req, res) => {
    const { sku, nombre, precio, cantidad, imagenUrl, puntoReorden } = req.body;

    if (!sku || !nombre || !precio || !cantidad || !imagenUrl || puntoReorden === undefined) {
        res.status(400);
        throw new Error('Faltan campos obligatorios');
    }

    const nuevoProducto = await Producto.create({sku, nombre, precio, cantidad, imagenUrl, puntoReorden});

    if (nuevoProducto.cantidad <= nuevoProducto.puntoReorden) {
        const mensaje = `El producto ${nuevoProducto.nombre} (SKU: ${nuevoProducto.sku}) fue registrado con un stock en o por debajo del punto de reorden (${nuevoProducto.cantidad}).`;

        await Notificacion.create({
            productoSku: nuevoProducto.sku,
            mensaje
        });

        await emailSender({
            from: process.env.Correo,
            to: process.env.Correo,
            subject: `⚠️ Alerta: Nuevo producto con bajo inventario`,
            text: mensaje
        });
    }

    res.status(201).json(nuevoProducto);
});

const updateProducto = asyncHandler(async (req, res) => {
    const producto = await Producto.findOne({ sku: req.params.sku });

    if (!producto) {
        res.status(404);
        throw new Error('Producto no encontrado');
    }

    const productoActualizado = await Producto.findOneAndUpdate(
        { sku: req.params.sku },
        req.body,
        { new: true }
    );


    if (productoActualizado.cantidad > productoActualizado.puntoReorden) {
        await Notificacion.updateMany(
            { productoSku: productoActualizado.sku, atendido: false },
            { $set: { atendido: true } }
        );
    }
    res.status(200).json(productoActualizado);
});

const deleteProducto = asyncHandler(async (req, res) => {
    const producto = await Producto.findOne({ sku: req.params.sku });

    if (!producto) {
        res.status(404);
        throw new Error('Producto no encontrado');
    }

    const skuEliminado = producto.sku;

    await Notificacion.updateMany(
        { productoSku: producto.sku, atendido: false },
        { $set: { atendido: true } }
    );

    await producto.deleteOne();

    res.status(200).json({ mensaje: `Producto con SKU ${skuEliminado} eliminado correctamente` });
});

module.exports = {getProductos, createProducto, updateProducto, deleteProducto};
