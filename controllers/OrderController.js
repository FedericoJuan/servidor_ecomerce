const Product = require('../models/ProductSchema');
const Order = require('./../models/OrderSchema');


const orderController = {
    getAllOrdersByUserId: async(req, res) => {
        const userId = req.params.userId        
        
        try{
            const orders = await Order.find({user: userId}).populate('product')
            res.status(200).json({
                message:'ok',
                orders
            })
        }catch(error) {
            res.status(400).json({
                message: error.message
            })
        }
    },
    addOrderToUser: async(req, res) => {
        const userId = req.body.userId
        const productId = req.body.productId

        if(!productId || !userId) {
            return res.status(400).json({message:'Faltan datos'})     
        }
        try{
            const product = await Product.findById(productId)
            const orderFound = await Order.findOne({user: userId, product: productId})

            if(product) {
                if(orderFound ){
                    console.log('actualizando...')
                    orderFound.quantity = orderFound.quantity + 1
                    orderFound.subTotal = product.precio * orderFound.quantity
                    await orderFound.save()
                    return res.status(200).json({
                        message: 'Producto agregao al carrito',
                        order: orderFound
                    })
                }else {
                    console.log('creando...')
                    const order = await Order.create({
                        user: userId,
                        product: productId,
                        subTotal: product.precio
                    })
                    return res.status(200).json({
                        message: 'Producto agregao al carrito',
                        order
                    })
                }
            }else {
                return res.status(400).json({
                    message:'Producto no encontrado'
                })
            }
        }catch(error) {
            res.status(400).json({
                message: error.message
            })
        }

        // const updated = await Order.updateOne({_id: orderExist._id}, {quantity: cuantityExist, subTotal})
        // const orderExist = await Order.find({user: userId, product:productId})[0]
        /* const orderCreated = await Order.create({
            user: userId,
            product: productId,
            subTotal: product.precio})
        */
    },
    getOrders: async(req, res) => {
        const userId = req.params.userId        
        
        try{
            const orders = await Order.find({user: userId})
                .populate('product')

            let total = 0
            orders.forEach(order => {
                total = total + order.subTotal
            })
            res.render('orders', {orders, total})
        }catch(error) {
            res.render('error', {errors: error.message})
        }
    },
    updateQuantitie: async(req, res) => {
        const quantity = parseInt(req.body.quantity)
        const userId = req.body.userId
        const productId = req.body.productId

        try{
            console.table({quantity, userId, productId})
            const order = await Order.findOne({user: userId, product: productId}).populate('product')
            console.log(order)
            if(order) {
                order.quantity= order.quantity + quantity
                
                if(order.quantity <= 0) {
                    return res.status(400).json({
                        message: 'La cantidad no puede ser menor a 1'
                    })
                }

                order.subTotal = order.subTotal + (order.product.precio * quantity)
                await order.save()
                return res.status(200).json({
                    message: 'ok',
                    order
                })
            }else {
                return res.status(400).json({
                    message:'Producto no encontrado'
                })
            }
        }catch(error) {
            res.status(400).json({
                message: error.message
            })
        }
    },
    deleteOrder: async(req, res) => {
        const userId = req.body.userId
        const productId = req.body.productId

        try{
            const order = await Order.findOneAndDelete({user: userId, product: productId})            
                return res.status(200).json({
                    message: 'ok',
                    order
                })
        }catch(error) {
            res.status(400).json({
                message: error.message
            })

        }
    }
}



module.exports = orderController


