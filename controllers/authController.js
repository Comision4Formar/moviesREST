const db  = require('../database/models')

module.exports = {
    processRegister : (req,res) => {
        const {email, pass} = req.body
        db.User.create({
            email,
            pass
        })

    },
    processLogin : (req,res) => {
        const {email, pass} = req.body

    }
}