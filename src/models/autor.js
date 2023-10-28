const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Autor = sequelize.define('Autor', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre es requerido',
            },
        },
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Los apellidos son requeridos',
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'El email es requerido',
            },
            isEmail: {
                msg: 'El email debe tener un formato válido',
            },
        },
    },
});

module.exports = Autor;