const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Base de Datos Conectada: ${conn.connection.host}`.green.underline)
    } catch(error){
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB;