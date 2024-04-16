const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Role = require('./Role.js');

class User extends Sequelize.Model {}

User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        tableName: 'users',
    }
);

//User.belongsTo(Role(), { foreignKey: 'role_id' });

module.exports = User;
