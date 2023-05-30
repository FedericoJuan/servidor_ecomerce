const mongoose = require("mongoose");

const stringConnection = "mongodb+srv://Federico:UdCAJW2Ph4RBNejF@cluster0.bm3n3fj.mongodb.net/?retryWrites=true&w=majority"


async function connectDatabase() {
    console.log('Conectando a la base de datos...')
    const connection = await mongoose.connect(stringConnection)
    console.log('Conectado a la base de datos ' + connection.connections[0].name)
}

module.exports = connectDatabase;