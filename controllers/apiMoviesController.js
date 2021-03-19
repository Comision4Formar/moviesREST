const db = require('../database/models')

module.exports = {
    getAll : (req,res) => {
        db.Pelicula.findAll()
        .then(peliculas => {
            let response = {
                meta : {
                    status : 200,
                    cantidad : peliculas.length,

                },
                data : peliculas
            }
            res.json(response)
        })
    },
    getByPk : (req,res) => {

    }
}