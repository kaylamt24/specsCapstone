
const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')


module.exports = {
    User: sequelize.define('user', {
        id: {
            type:DataTypes.INTEGER, 
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        hashedPass: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}