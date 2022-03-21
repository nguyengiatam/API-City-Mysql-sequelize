require('dotenv').config({path: `${__dirname}/../../.env`})
const sequelize = require('sequelize')

const connection = new sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    logging: false
})

connection.authenticate()
.then(val => console.log('Db connected'))
.catch(err => console.log(err))

module.exports = connection
