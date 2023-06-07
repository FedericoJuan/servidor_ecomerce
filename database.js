const mongoose = require("mongoose");

const stringConnection = "mongodb+srv://user:Password1234@cluster0.6pwzns4.mongodb.net/ecomerce?retryWrites=true&w=majority"


async function connectDatabase() {
    console.log('Conectando a la base de datos...')
    const connection = await mongoose.connect(stringConnection)
    console.log('Conectado a la base de datos ' + connection.connections[0].name)
}

module.exports = connectDatabase;