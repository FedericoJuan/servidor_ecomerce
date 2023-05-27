const express = require('express');
const connectDatabase = require('./database');
const cargarProductosIniciales = require('./utils/cargarProductosIniciales');
const cargarUsuarioAdmin = require('./utils/cargarUsuarioAdmin');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const app = express();

// configuracion de archivos estaticos (html, css, js lado front e imagenes)
app.use(express.static('uploads'));
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const corsConfig = { // configuracion de autorizacion del servidor hacia los clientes
        "origin": "*",
        "methods": "GET,HEAD,PUT,POST,DELETE",
      }

app.use(cors(corsConfig))

// sset ejs view engine
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // motor de plantillas



app.use(require('./routes/webRouter'))
app.use('/admin', require('./routes/adminRouter'));
app.use('/user', require('./routes/userRouter'));
app.use('/product', require('./routes/productRouter'));
app.use('/order/', require('./routes/orderRouter'));

// conectarme al conectarme a la base de datos ejecuto un a promesa
// si sale bien creo un usuario administrador por defecto
// e inicio el servidor

const port = process.env.PORT || 4040;
connectDatabase()
    .then(() => {
        // creo un usuario administrador por defecto
        cargarProductosIniciales().then()
        cargarUsuarioAdmin().then()
       
        app.listen(4040, () => {
            console.log('Servidor escuchando en el puerto ' + port);
        })
    }).catch((error) => {
        console.log('No se pudo iniciar el servidor ' + error.message);
    })






