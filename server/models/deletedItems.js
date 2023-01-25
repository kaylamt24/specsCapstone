const {DataTypes} = require('sequelize')
const {sequelize} = require ("../util/database")




module.exports = {
    DeletedItems: sequelize.define('deleted_items', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        item_url:DataTypes.STRING,
        item_name: DataTypes.STRING,
        item_picture: DataTypes.STRING,
        item_price: DataTypes.FLOAT
    })
}