'use strict';

const config = require('../config');

exports.init = function (sequelize) {
    exports.Order = sequelize.import(config.modelsFolder + 'OrderModel');
};