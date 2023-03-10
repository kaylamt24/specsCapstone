const {DataTypes} = require('sequelize')
const {sequelize} = require ("../util/database")


module.exports = {
    
    SavedItems: sequelize.define('saved_items', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        item_url:DataTypes.STRING(750),
        item_name: DataTypes.STRING,
        item_price: DataTypes.STRING,
        category: DataTypes.STRING,
        item_picture: DataTypes.STRING(150000),
    }),

    DeletedItems: sequelize.define('deleted_items', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        item_url:DataTypes.STRING(750),
        item_name: DataTypes.STRING,
        item_price: DataTypes.STRING,
        category: DataTypes.STRING,
        savedItemId: {
            type: DataTypes.INTEGER,
            references: {
                model: this.SavedItems,
                key: 'id'
            }
        },
        item_picture: DataTypes.STRING(150000),
    })
}
