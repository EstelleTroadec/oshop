const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Category = require('./Category.js');

class Product extends Sequelize.Model {}
/**
 * Voici les champs nécessaires pour faire le Model
 * category_id int
 * ref string
 * image string
 * title string
 * description text
 * price number
 * tableName: 'products',
 */

Product.init(
    {
        ref: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.INTEGER,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        category_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        tableName: 'products',
    }
);

module.exports = Product;
