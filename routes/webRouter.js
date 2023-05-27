const express = require('express');
const productController = require('../controllers/productController');
const orderController = require('../controllers/OrderController');
const productRouter = express.Router();

productRouter.get('/', productController.getAll);
productRouter.get('/detalle/:id', productController.detail);
productRouter.get('/contact', (req, res) => res.render('contact'));
productRouter.get('/about-us', (req, res) => res.render('about-us'));
productRouter.get('/orders/:userId', orderController.getOrders)

module.exports = productRouter;