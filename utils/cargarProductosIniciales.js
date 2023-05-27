const Product = require("../models/ProductSchema");

const listaProductos = 
[
    {
        producto: 'Remera blanca mujer',
        imagen: 'photo-1554568218-0f1715e72254.jpg',
        descripcion: 'Regalate una alegria!',
        precio: 2500,
    },
    {
        producto: 'Remera blanca hombre',
        imagen: 'photo-1527719327859-c6ce80353573.jpg',
        descripcion: 'Elegantemente deportivo',
        precio: 4000,
    },
    {
        producto: 'Buzo Gris unisex.',
        descripcion: 'comodo y a la moda!',
        imagen: 'photo-1576775068951-d4983d253497.jpg',
        precio: 1550,   
    },
    {
        producto: 'Buzo Dama Lana',
        descripcion: 'Un Abrazo de la abuela!',
        imagen: 'photo-1520965291898-92731ff2f8ad.jpg',
        precio: 5000,
    },
    {
        producto: 'Vestido Color Hueso',
        descripcion: 'Elegante para todo evento',
        imagen: 'photo-1594633313593-bab3825d0caf.jpg',
        precio: 6500,
    },
    {
        producto: 'Buzo Hombre Samuray',
        descripcion: 'Siente el poder ancestral del Bushido',
        imagen: 'photo-1613338761569-735c3fc68699.jpg',
        precio: 5500,
    },
    {
        producto: 'Campera Jean Celeste unidex.',
        descripcion: 'Los Clasicos nunca mueren',
        imagen: 'photo-1600574691453-499962cc0611.jpg',
        precio: 7500,
    },
    {
        producto: 'Camisa Cuadrille Hombre',
        descripcion: 'La camisa que te hara sentir como un verdadero caballero',
        imagen: 'photo-1571367034861-e6729ad9c2d5.jpg',
        precio: 4500,
    },
]

async function cargarProductosIniciales() {
    for(let i = 0; i < listaProductos.length; i++){
        const producto = listaProductos[i];
        const productFound = await Product.findOne({producto: producto.producto})
        if(!productFound){
            await Product.create(producto)
        }
    }
    console.log('Productos Cargados 👍')
}
    

module.exports = cargarProductosIniciales;