const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');
const isLoggedMeddleware = require('../middlewares/autenticationMiddleware');
const isAdminMeddleware = require('../middlewares/authorizationMiddleware');

productRouter.get('/', productController.getAll);
productRouter.post('/create',isLoggedMeddleware, isAdminMeddleware, productController.upload, productController.store);
productRouter.get('/:id', productController.getById);
productRouter.put('/:id', isLoggedMeddleware, isAdminMeddleware,productController.upload, productController.update);
productRouter.delete('/:id', isLoggedMeddleware, isAdminMeddleware, productController.delete);

module.exports = productRouter;
