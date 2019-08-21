'use strict';

module.exports = {
    db : 'postgres://postgres:123456789Egor@localhost:5432/deliveryDB',
    port: 3000,
    frontendUrl: 'http://localhost:8080',
    jwtSecretKey: 'fantik',
    // eslint-disable-next-line no-undef
    modelsFolder: (`${__dirname}/Models/`),
    forceSyncDb: false, // migration DB
};
