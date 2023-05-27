const User  = require('../models/UserShema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = Number(process.env.SALT);
const secret = process.env.JWT_SECRET_KEY

const userController = {
    listAll: async(req, res) => {
        try{
            const users = await User.find();
            res.status(200).json({message: 'ok', users});
        }catch(error){
            res.status(400).json({message: error.message});
        }
    },

    getById: async(req, res) => {
        try{
            const user = await User.findById(req.params.id);
            res.status(200).json({message: 'ok', user});
        }catch(error){
            res.status(400).json({message: error.message});
        }
    },

    pageRegister: (req, res) => {
        res.render('register');
    },

    register: async(req, res) => {
        let username = req.body.username;
        let email = req.body.email.toLowerCase();
        let password = req.body.password;

        try{

            const emailExist = await User.findOne({email});
            if(emailExist){
                return res.status(400).json({
                    message: 'El email ya esta registrado'
                });
            }
    
            const newUser = await User.create({
                username,
                email,
                password: await bcrypt.hash(password, saltRounds)
            })
    
            res.status(201).json({
                message: 'registrado', 
                user: {
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role
                }
            });
        }catch(error){
            res.status(400).json({message: error.message});
        }
    },

    pageLogin: (req, res) => {
        res.render('login');
    },


    login: async(req, res) => {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;

        try{
            const userFound = await User.findOne({email});
            if(!userFound){
                return res.status(400).json({message: 'Credenciales incorrectas'});
            }

            if(!await bcrypt.compare(password, userFound.password)){
                return res.status(400).json({message: 'Credenciales incorrectas'});
            }

            userFound.password = undefined;
            const token = jwt.sign(userFound.toJSON(), secret, {
                expiresIn: '2h',
            });

            res.status(200).json({
                message: 'logueado',
                token,
                user:{
                    id: userFound._id,
                    username: userFound.username,
                    email: userFound.email,
                    role: userFound.role,
                    token
                }
            })

        }catch(error){
            res.status(400).json({message: error.message});
        }
            
    },
    delete: (req, res) => {
        const id = req.params.id;
       User.findByIdAndRemove({_id: id})
        .then(() => {
            res.json({message: 'Usuario eliminado'});
        })
        .catch(error => {
            res.json({message: error.message});
        })
    },
    update: async(req, res) => {
        console.table(req.body)
        const id = req.params.id;

        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password === ''? undefined: await bcrypt.hash(req.body.password, saltRounds) ;
        const role = req.body.role;
        try{
            await User.findByIdAndUpdate({_id: id}, {
                username,
                email,
                password,
                role
            })
            console.log('Usuario actualizado');
            res.json({message: 'Usuario actualizado'});
        }catch(error){
            log.error(error.message);
            res.json({message: error.message});
        }
    },
    store: async(req, res) => {
        
        
        const username = req.body.username;
        const email = req.body.email;
        let password =req.body.password;
        const role = req.body.role;

        if(password === '' || password === '' || email === ''){
            return res.status(400).json({message: 'Campos vacios'});
        }
        password = await bcrypt.hash(password, saltRounds);
        try{
            await User.create({
                username,
                email,
                password,
                role
            })
            console.log('Usuario creado');
            res.json({message: 'Usuario creado'});
        }catch(error){
            log.error(error.message);
            res.json({message: error.message});
        }
    }
}

module.exports = userController;