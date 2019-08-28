'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Sequelize.Model {}
    Order.init({ // TODO: make a period of execution
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            allowNull: false,
        },
        vkId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        paymentMethod: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '-',
        },
        price: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        comments: {
            type: DataTypes.TEXT,
            defaultValue: '-',
            allowNull: false,
        }
    }, {sequelize, modelName: 'Orders'});
    return Order;
};