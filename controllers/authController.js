const db  = require('../database/models')

module.exports = {
    processRegister : (req,res) => {
        const {email, pass} = req.body;
        db.User.create({
            email,
            pass
        })
        .then(user => {
            res.status(200).json({
                msg : "usuario registrado con éxito"
            })
        })
        .catch(error => res.status(500).json(error))

    },
    processLogin : (req,res) => {
        const {email, pass} = req.body

    }
}