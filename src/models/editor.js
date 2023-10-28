const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Editor = sequelize.define('Editor', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre es requerido',
            },
        },
    },
    domicilio: DataTypes.STRING,
    ciudad: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La ciudad es requerida',
            },
        },
    },
    estado: DataTypes.STRING,
    pais: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El país es requerido',
            },
        },
    },
    website: DataTypes.STRING,
});

module.exports = Editor;