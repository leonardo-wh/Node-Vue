const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Autor = require('./autor');
const Editor = require('./editor');

const Libro = sequelize.define('Libro', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El título es requerido',
            },
        },
    },
    fecha_publicacion: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La fecha de publicación es requerida',
            },
        },
    },
    portada: DataTypes.STRING,
});

Libro.belongsToMany(Autor, { through: 'AutorLibro' });
Libro.belongsTo(Editor);

module.exports = Libro;