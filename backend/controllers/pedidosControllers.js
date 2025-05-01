const asyncHandler = require('express-async-handler');
const Producto = require('../models/productosModel');
const Pedido = require('../models/pedidosModel'); 

const procesarPedido = asyncHandler(async (req, res) => {
    const { productos } = req.body;

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
        res.status(400);
        throw new Error('Debes agregar al menos un producto');
    }

    const errores = [];

    for (const item of productos) {
        const producto = await Producto.findOne({ sku: item.sku });

        if (!producto) {
            errores.push(`Producto con SKU ${item.sku} no encontrado`);
            continue;
        }

        if (producto.cantidad < item.cantidad) {
            errores.push(`Stock insuficiente para SKU ${item.sku}`);
            continue;
        }

        producto.cantidad -= item.cantidad;
        await producto.save();
    }

    if (errores.length > 0) {
        res.status(400);
        throw new Error(`Errores en el pedido:\n${errores.join('\n')}`);
    }

    await Pedido.create({ productos });

    res.status(200).json({ mensaje: 'Pedido procesado y stock actualizado correctamente' });
});

module.exports = {procesarPedido};