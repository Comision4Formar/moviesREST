require('dotenv').config()

const db  = require('../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    processRegister : (req,res) => {
        const {email, pass} = req.body;
        db.User.create({
            email,
            pass : bcrypt.hashSync(pass.trim(),12)
        })
        .then(user => {
            const token = jwt.sign(
                {
                    id : user.id
                },
                process.env.TOP_SECRET,
                {
                    expiresIn : 60*2
                }
            )

            return res.status(200).json({
                auth : true,
                msg : "registro exitoso",
                token
            })
        })
        .catch(error => res.status(500).json(error))

    },
    processLogin : (req,res) => {
        const {email, pass} = req.body

        if(!email || !pass){
            return res.status(401).json({
                auth : false,
                msg : 'faltan datos'
            })
        }

        db.User.findOne({
            where :{
                email
            }
        })
        .then(user => {
            if(!user || !bcrypt.compareSync(pass.trim(),user.pass)){
                return res.status(404).json({
                    auth : false,
                    msg: 'credenciales inválidas'
                })
            }

            const token = jwt.sign(
                {
                    id : user.id
                },
                process.env.TOP_SECRET,
                {
                    expiresIn : 60*2
                }
            )
            return res.status(200).json({
                auth : true,
                msg : "usuario logueado",
                token
            })
        })
        .catch(error => res.status(500).json(error))
    }
}