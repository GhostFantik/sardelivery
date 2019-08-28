'use strict';

const Sequelize = require('sequelize');
const config = require('./config');
const ModelInitializer = require('./Models/ModelInitializer');

let sequelize = null;

exports.get = function (callback) {
    callback(sequelize, Sequelize);
};
exports.syncAll = function(callback){
    sequelize.sync({force: config.forceSyncDb}).then(() => {
        console.log('Database sync is successful!');
        callback();
    }).catch((err) => console.log(`Database sync error: ${err}`));
};
exports.connect = function (callback) {
    sequelize = new Sequelize(config.db, {logging: false}); // TODO: make a pool
    sequelize.authenticate()
        .then(() => {
            console.log('Database connection is successful!');
            ModelInitializer.init(sequelize);
            callback();
        })
        .catch(err => console.log(`Error connection to DB: ${err}`));
};
exports.closeConnect = function (callback) {
    sequelize.close().then(() => {
        console.log('Database connection is closed!');
        callback();
    }).catch((err) => `Error disconnect to DB: ${err}`);
};