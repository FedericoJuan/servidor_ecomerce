const express = require('express')
const orderController = require('../controllers/OrderController')
const isLoggedMeddleware = require('../middlewares/autenticationMiddleware')

const orderRouter = express.Router()


orderRouter.get('/:userId', isLoggedMeddleware, orderController.getAllOrdersByUserId)
orderRouter.post('/add', isLoggedMeddleware, orderController.addOrderToUser)
orderRouter.post('/modify-quantity', isLoggedMeddleware, orderController.updateQuantitie)
orderRouter.delete('/', isLoggedMeddleware, orderController.deleteOrder)

module.exports = orderRouter