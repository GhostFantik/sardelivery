'use strict';

const express = require('express');
const passport = require('./passport');
const config = require('./config');
const db = require('./db');
const OrderController = require('./Controllers/OrderController');
const AdminController = require('./Controllers/AdminController');

const app = express();

app.use(express.json());
app.use(passport.initialize());

// CORS
app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': config.frontendUrl,
        'Access-Control-Allow-Methods': 'POST, GET',
        'Access-Control-Allow-Headers': '*',
    });
    next();
});

// routers
app.use('/api/orders', OrderController);
app.use('/api/admin', AdminController); // only for develop!

// error
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).end();
});

// start app
db.connect(() => {
    db.syncAll(() => // TODO: only for developing
        app.listen(config.port, () =>
            console.info(`Server is started on port ${config.port}!`)));
});

process.on('SIGINT', (code) => {
    console.log('Server is stopped!');
    db.closeConnect(() => {
        console.log(`Server is stopped with code ${code}`);
        process.exit();
    });
});