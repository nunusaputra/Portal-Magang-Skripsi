const { Sequelize } = require('sequelize')

const db = new Sequelize('portal_magang', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = db