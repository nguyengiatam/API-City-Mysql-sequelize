const db = require('../config/db.config')
const sequelize = require('sequelize')

const cityModel = db.define('city', {
    id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: sequelize.STRING, allowNull: false},
    zip: {type: sequelize.INTEGER, allowNull: false}
},{
    timestamps: false,
    tableName: 'city'
})

module.exports = cityModel