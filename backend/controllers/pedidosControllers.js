const asyncHandler = require('express-async-handler');
const Producto = require('../models/productosModel');
const Pedido = require('../models/pedidosModel');
const Notificacion = require('../models/notificacionModel');
const { emailSender } = require('../config/email');

const getPedidos = asyncHandler(async (req, res) => {
    const pedidos = await Pedido.find();
    res.status(200).json(pedidos);
});

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

        if (producto.cantidad <= producto.puntoReorden) {
            const mensaje = `El producto ${producto.nombre} (SKU: ${producto.sku}) alcanzó o bajó su punto de reorden. Cantidad actual: ${producto.cantidad}`;

            const yaExiste = await Notificacion.findOne({
                productoSku: producto.sku,
                atendido: false
            });

            if (!yaExiste) {
                await Notificacion.create({
                    productoSku: producto.sku,
                    mensaje
                });

                await emailSender({
                    from: process.env.Correo,
                    to: process.env.Correo,
                    subject: `⚠️ Alerta de inventario bajo: ${producto.nombre}`,
                    text: mensaje
                });
            }
        }
    }

    if (errores.length > 0) {
        res.status(400);
        throw new Error(`Errores en el pedido:\n${errores.join('\n')}`);
    }

    await Pedido.create({ productos });

    res.status(200).json({ mensaje: 'Pedido procesado y stock actualizado correctamente' });
});

module.exports = { procesarPedido, getPedidos };