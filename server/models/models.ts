const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const { modelManager } = require('../db')


export const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

export const interStore = sequelize.define('interStore',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, },
    description: {type: DataTypes.STRING, },
    price: {type: DataTypes.INTEGER, },
    url: {type: DataTypes.STRING},

})

export const Basket = sequelize.define('Basket',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    trueid: {type: DataTypes.INTEGER, allowNull: false},
    url: {type: DataTypes.STRING, allowNull: false},
    count: {type: DataTypes.INTEGER, defaultValue: 0},
})

// Basket.hasMany(interStore)
// interStore.belongsTo(Basket)


// module.exports = {
//     User, 
//     interStore,
//     Basket,
// }