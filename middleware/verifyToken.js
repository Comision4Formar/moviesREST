const jwt = require('jsonwebtoken');
const db = require('../database/models');


module.exports = (req,res,next) => {
    const token = req.headers['token']
    if(!token){
        return res.status(401).json({
            auth:false,
            msg : 'token no enviado...'
        })
    }
    try {

        const jwtDecode = jwt.verify(token,process.env.TOP_SECRET);
        db.User.findByPk(jwtDecode.id)
        .then(user => {
            if(!user){
                return res.status(401).json({
                    msg : "el usuario no existe"
                })
            }
            next()
        })
        .catch(error => res.status(500).json(error))
        
    } catch (error) {
        return res.status(401).json({
            msg : 'token inválido'
        })
    }
}