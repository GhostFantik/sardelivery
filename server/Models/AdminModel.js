'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Admin extends Sequelize.Model {}
    Admin.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.TEXT,
            unique: true,
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        salt: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {sequelize, modelName: 'Admins'});
    return Admin;
};