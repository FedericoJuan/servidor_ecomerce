const mongoose = require("mongoose");

const stringConnection = process.env.MONGO_URL


async function connectDatabase() {
    console.log('Conectando a la base de datos...')
    const connection = await mongoose.connect(stringConnection)
    console.log('Conectado a la base de datos ' + connection.connections[0].name)
}

module.exports = connectDatabase;