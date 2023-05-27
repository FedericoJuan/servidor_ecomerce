const Product = require("../models/ProductSchema");
const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req,file,cb) =>{
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
    }
})

const multerInstance = multer({
    storage,
    limits: {fileSize: 1024 * 1024 * 5}, // 5MB
    fileFilter: (req,file,cb) => {
        file.mimetype.split('/')[0] === 'image' ? cb(null, true) : cb(null, false);
    }
})


const productController = {
    getAll: async (req,res) => {
        consulta = req.query.consulta;
        try{
            let products = [];
            if(consulta && consulta !== ''){
                products = await Product.find({producto: {$regex: consulta, $options: 'i'}}) // buscar todo lo que coincida con consulta
            }else{
                products = await Product.find();
            }
            res.status(200).render('index', {products});
        }catch(error){
            res.render(render('error',{errors:error.message}));
        }
    },
    getById: async(req,res) => {
        const id = req.params.id;
        
        try{
            const product = await Product.findById(id)
            res.status(200).json({
                message: 'ok',
                product
            })
        }catch(error){
            res.status(400).json({
                message: error.message
            });
        }
    },

    detail: async(req,res) => {
        try{
            const producto = await Product.findById(req.params.id)
            res.render('producto_detalle', {producto});
        }catch(error){
            res.render('error',{errors:error.message});
        }
    },
    upload: multerInstance.single('imagen'),

    create: (req, res) => {
        res.render('createProduct');
    },

    store: async (req,res) => {
        const producto = req.body.producto;
        const precio = req.body.precio;
        const descripcion = req.body.descripcion;
        const imagen = req.file && req.file.filename? req.file.filename : undefined;

        try{

            if(!req.file){
                return res.status(400).json({message: 'No se subio ninguna imagen'});
            }
    
    
            const newProduct = await Product.create({
                producto,
                imagen,
                precio,
                descripcion,
            });

            res.status(201).json({
                message: 'Producto creado', 
                product: newProduct
            });
        }catch(error) {
            if(fs.existsSync('uploads/' + imagen)){
                fs.unlinkSync('uploads/' + imagen); // si por algun motivo no puedo crear el registro borro la imagen
            }
            res.json({message:error.message});
        }
    },
    update: async(req,res) => {
        const id = req.params.id;
        const producto = req.body.producto;
        const imagen = req.file && req.file.filename? req.file.filename : undefined;
        const precio = req.body.precio;
        const descripcion = req.body.descripcion;

        const updatedProduct = {
            producto,
            imagen,
            precio,
            descripcion
        }
        
        if(req.file){
            const productOriginal = await Product.findById(id);
            // borro la imagen anterior para ahorrar espacio
            if(fs.existsSync('uploads/' + productOriginal.imagen)){
                fs.unlinkSync('uploads/' + productOriginal.imagen);
            }
        }

        try{
           const resultProduct = await Product.findByIdAndUpdate(id, updatedProduct)
            res.status(200).json({message: 'Producto Actualizado', product: resultProduct});
        }catch(error){
        
         res.status(400).json({message:error.message});
        }
    },
    delete: async(req,res) => {
        const id = req.params.id;
        try{
            const productOriginal = await Product.findById(id);
            if(!productOriginal) return res.status(404).json({message: 'Producto no encontrado'});
    
            // borro la imagen anterior para ahorrar espacio
            if(fs.existsSync('uploads/' + productOriginal.imagen)){
                fs.unlinkSync('uploads/' + productOriginal.imagen);
            }
            await Product.findByIdAndRemove(id)
            res.json({message: 'Producto Eliminado'});
        }catch(error){
            res.json({message:error.message});
        }   
    }
}

module.exports = productController;