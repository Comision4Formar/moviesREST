module.exports = (sequelize, dataTypes) => {

    const alias = 'Pelicula';

    const cols = {
        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        title : {
            type : dataTypes.STRING(500),
            allowNull : false,
            validate : {
                notNull : {
                    msg : "El campo title no pude ser nulo"
                },
                notEmpty : {
                    msg : 'Tenes que escribir el titulo de la película'
                }
            }
        },
        rating : {
            type : dataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull : false,
            validate : {
                notNull : {
                    msg : "El campo rating no pude ser nulo"
                },
                notEmpty : {
                    msg : 'Tenes que escribir el rating de la película'
                }
            }
        },
        awards : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            validate : {
                notNull : {
                    msg : "El campo awards no pude ser nulo"
                },
                notEmpty : {
                    msg : 'Tenes que escribir los premios'
                }
            }
        },
        release_date : {
            type : dataTypes.DATE,
            allowNull : false,
            validate : {
                notNull : {
                    msg : "El campo release_date no pude ser nulo"
                },
                notEmpty : {
                    msg : 'Tenes que escribir la fecha de estreno'
                }
            }
        },
        length : {
            type : dataTypes.INTEGER.UNSIGNED,
            defaultValue : null
        },
        genre_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            defaultValue : null
        }
    }

    const config = {
        tableName : 'movies',
        timestamps : true,
        underscored : true
    }

    const Movie = sequelize.define(alias, cols, config)

    Movie.associate = function(models){
        Movie.belongsTo(models.Genero,{
            as : 'genero',
            foreignKey : 'genre_id'
        })

        Movie.belongsToMany(models.Actor,{
            as : "actores",
            through : "actor_movie",
            foreignKey : "movie_id",
            otherKey : "actor_id"
        })
    }

    return Movie
}