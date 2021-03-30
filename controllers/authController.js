const db  = require('../database/models');
const bcrypt = require('bcrypt');

module.exports = {
    processRegister : (req,res) => {
        const {email, pass} = req.body;
        db.User.create({
            email,
            pass : bcrypt.hashSync(pass.trim(),12)
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
        db.User.findOne({
            where :{
                email
            }
        })
        .then(user => {
            if(!user || !bcrypt.compareSync(pass.trim(),user.pass)){
                return res.status(404).json({msg: 'credenciales inválidas'})
            }
            res.status(200).json({msg : 'Bienvenido!!'})

        })

    }
}