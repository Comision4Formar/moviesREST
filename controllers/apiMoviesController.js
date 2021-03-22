const db = require('../database/models');

const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;
const getUrlBase  = (req) => req.protocol + '://' + req.get('host');

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
                        listado : getUrlBase(req) + '/api/movies'
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
        const {title,awards,rating,release_date,length} = req.body;
        db.Pelicula.create({
            title,
            rating,
            awards,
            release_date,
            length
        })
        .then(result => {
            return res.status(201).json({
                status : 201,
                msg : 'La película fue registrada con éxito',
                endpoint : getUrlBase(req) + '/api/movies/' + result.id
            })
        })
        .catch(error => {
            console.log(error)
            switch (error.name) {
                case "SequelizeValidationError":
                    let erroresMsg = [];
                    let erroresNotNull = [];
                    let erroresValidation = [];
                    error.errors.forEach(error => {
                        erroresMsg.push(error.message)
                        if (error.type == "notNull Violation") {
                            erroresNotNull.push(error.message)
                        }
                        if (error.type == "Validation error") {
                            erroresValidation.push(error.message)
                        }
                    });
                    let response = {
                        status: 400,
                        messages: "datos faltantes o erróneos",
                        errores: {
                            cantidad: erroresMsg.length,
                            msg: erroresMsg,
                            notNull: erroresNotNull,
                            validation: erroresValidation
                        }
                    }
                    return res.status(400).json(response)
                    default:
                        return res.status(500).json({error})
                }
        })
    },
    update :(req,res) => {
        const {title,awards,rating,release_date,length} = req.body;

        db.Pelicula.update({
            title,
            rating,
            awards,
            release_date,
            length
        },
        {
            where : {
                id : req.params.id
            }
        })
        .then(result => {
            if(result[0]){
                return res.status(201).json({
                    meta : {
                        state : 201,
                        msg : 'Actualización exitosa'
                    },
                    data : {
                        listado : getUrlBase(req) + '/api/movies/' + req.params.id
                    }
                })
            }else{
                return res.status(200).json({
                    meta : {
                        state : 200,
                        msg : 'No se hicieron cambios'
                    }
                })
            }
        })
    },
    remove : (req,res) => {
        db.Pelicula.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(result => {
            if(result){
                res.status(200).json({
                    status : 200,
                    msg : 'La pelicula fue borrada'
                })
            }else{
                res.status(404).json({
                    status : 404,
                    msg : 'Pelicula no encontrada'
                })
            }
        })
        .catch(error => res.status(500).json({
            error
        }))
    }
}