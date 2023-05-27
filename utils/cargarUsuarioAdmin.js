const User = require('../models/UserShema');
const bcrypt = require('bcrypt');

async function cargarUsuarioAdmin() {
    const adminFound = await User.findOne({username: 'admin'})
    if(!adminFound){
        await User.create({
            username: 'admin',
            email: 'admin@gmail.com',
            role: 'admin',
            password: await bcrypt.hash('123456', Number(process.env.SALT))
        })
    }
    console.log('[ADMINISTRADOR] usuario🤵 -> admin  email 📧 -> admin@gmail.com  password 🔑 -> 123456')
}

module.exports = cargarUsuarioAdmin;