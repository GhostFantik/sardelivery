'use strict';

const express = require('express');
const config = require('./config');
const db = require('./db');
const OrderController = require('./Controllers/OrderController');

const app = express();

app.use(express.json());

// routers
app.use('/api/orders', OrderController);

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