const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dbnode', 'dbnode', 'dbnode', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;