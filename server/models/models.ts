const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const { modelManager } = require('../db')


export const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    voited: {type: DataTypes.TEXT},
    verification: {type:DataTypes.STRING, allowNull: false},
    activation: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
})

export const interStore = sequelize.define('interStore',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, },
    description: {type: DataTypes.STRING, },
    price: {type: DataTypes.INTEGER, },
    url: {type: DataTypes.STRING},
    raiting: {type: DataTypes.STRING},
    type: {type: DataTypes.STRING},
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

export const Orders = sequelize.define('Orders',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: true},
    price: {type: DataTypes.INTEGER, allowNull: false},
    trueid: {type: DataTypes.INTEGER, allowNull: true},
    timeToDeliver: {type: DataTypes.INTEGER, defaultValue: 2},
    namePerson: {type: DataTypes.STRING, allowNull: false},
    telPerson: {type: DataTypes.BIGINT(13), allowNull: false}
})

export const Messages = sequelize.define('messages',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    idProods: {type: DataTypes.INTEGER, allowNull: false},
    messages: {type: DataTypes.STRING, allowNull: false},
    imgPerson: {type: DataTypes.STRING, allowNull: true},
    namePerson: {type: DataTypes.STRING, allowNull:true},
    email: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    activation: {type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false}
})

// Basket.hasMany(interStore)
// interStore.belongsTo(Basket)


// module.exports = {
//     User, 
//     interStore,
//     Basket,
// }