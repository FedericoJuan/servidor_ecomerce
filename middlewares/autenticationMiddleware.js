const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET_KEY

const isLoggedMeddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({message: 'No estas autorizado'});
    }

    jwt.verify(token, secret, (error, decoded) => {
        if(error){
            return res.status(401).json({message: error.message});
        }
        req.user = decoded;
        next();
    })
}

module.exports = isLoggedMeddleware;