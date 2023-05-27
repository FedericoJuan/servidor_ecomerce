const express = require('express');
const adminRouter = express.Router();
const Product = require('../models/ProductSchema');
const User = require('../models/UserShema');

adminRouter.get('/users', async(req, res) => {
    try{
        const users = await User.find(); 
        res.render('admin/users',{users})
    }catch(error){
        res.render('error', {errors: error.message})
    }
});

adminRouter.get('/products', async(req, res) => {
    try{
        const products = await Product.find();
        res.render('admin/products', {products})
    }catch(error){
        res.render('error', {errors: error.message})
    }

})


module.exports = adminRouter;