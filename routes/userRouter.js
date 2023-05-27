const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const isLoggedMeddleware = require('../middlewares/autenticationMiddleware');
const isAdminMeddleware = require('../middlewares/authorizationMiddleware');

userRouter.get('/', isLoggedMeddleware, isAdminMeddleware, userController.listAll);
userRouter.get('/register', userController.pageRegister);
userRouter.post('/register', userController.register);
userRouter.get('/login', userController.pageLogin);
userRouter.post('/login', userController.login);
userRouter.post('/create', isLoggedMeddleware, isAdminMeddleware, userController.store)
userRouter.delete('/:id,', isLoggedMeddleware, isAdminMeddleware, userController.delete);
userRouter.put('/:id', isLoggedMeddleware, userController.update);
userRouter.get('/:id', isLoggedMeddleware, userController.getById);

module.exports = userRouter;
