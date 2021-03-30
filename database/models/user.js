'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type :  DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'El campo no puede ser nulo'
        },
        notEmpty : {
          msg : 'El campo email es obligatorio'
        },
        isEmail : {
          msg : 'Debe ser un email válido'
        }
      }
    },
    pass: {
      type :  DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'El campo no puede ser nulo'
        },
        notEmpty : {
          msg : 'El campo contraseña es obligatorio'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};