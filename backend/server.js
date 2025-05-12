const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const cors = require("cors")

const port = process.env.PORT || 5000;


connectDB();

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors());

app.use('/api/productos', require('./routes/productosRoutes'));
app.use('/api/pedidos', require('./routes/pedidosRoutes'));
app.use('/api/forms', require('./routes/formsRoutes'));
app.use('/api/notificacion', require('./routes/notificacionRoutes'));
app.use('/api/usuarios', require('./routes/usuariosRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Servidor iniciando en el puerto ${port}`));