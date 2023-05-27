const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET_KEY

const isAdminMeddleware = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(401).json({message: 'No tienes los privilegios necesarios'});
    }
    next();
}

module.exports = isAdminMeddleware;