'use strict';

module.exports = {
    db : 'postgres://postgres:123456789Egor@db:5432/deliveryDB',
    port: 3000,
    frontendUrl: 'http://192.168.99.100:80',
    jwtSecretKey: 'fantik',
    // eslint-disable-next-line no-undef
    modelsFolder: (`${__dirname}/Models/`),
    forceSyncDb: false, // migration DB
};
