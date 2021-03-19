const db = require('../database/models');

const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;


module.exports = {
    getAll : (req,res) => {
        db.Pelicula.findAll()
        .then(peliculas => {
            peliculas.forEach(pelicula => {
                pelicula.setDataValue('link', getUrl(req) + '/' + pelicula.id)
            });
            let response = {
                meta : {
                    status : 200,
                    cantidad : peliculas.length,
                    link : getUrl(req)
                },
                data : peliculas
            }
            return res.status(200).json(response)
        })
        .catch(error => res.status(500).json({
            error
        }))
    },
    getById : (req,res) => {
        if(req.params.id % 1 !== 0){
            return res.status(400).json({
                status : 400,
                msg : "ID incorrecto"
            })
        }
        db.Pelicula.findByPk(req.params.id)
        .then(pelicula => {
            if(pelicula){
                return res.status(200).json({
                    meta : {
                        status : 200,
                        link : getUrl(req),
                        listado : req.protocol + '://' + req.get('host') + '/api/movies'
                    },
                    data : pelicula
                })
            }else{
                return res.status(404).json({
                    status : 404,
                    msg : "ID no encontrado"
                })
            }
        })
        .catch(error => res.status(500).json({
            error
        }))
    },
    create : (req,res) => {
        
    }
}