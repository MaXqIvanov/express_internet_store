const {Sequelize} = require('sequelize')



module.exports = new Sequelize(
    process.env.DB_NAME, // Название БД
    process.env.DB_USER, // Пользователь
    process.env.DB_PASSWORD, //Пароль
    {
        dialect: 'mysql',   //or MySql
        host: process.env.DB_HOST ,
    }

)