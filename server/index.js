'use strict';

const express = require('express');
const http = require('http');
const passport = require('./passport');
const config = require('./config');
const db = require('./db');
const socket = require('./Socket.IO/socket');
const OrderController = require('./Controllers/OrderController');
const AdminController = require('./Controllers/AdminController');

const app = express();
const server = http.createServer(app);

socket.initialize(server);


app.use(express.json());
app.use(passport.initialize());

// CORS
app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
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
server.on('error', e => console.log('GGG: ' + e));
// start app
db.connect(() => {
    db.syncAll(() => { // TODO: only for developing
        try {
            console.log('CHECK');
            server.listen(config.port, () => {
                console.log(`Server is started on port ${config.port}!`);
                console.log('CALLBACK!!!');
            });
            console.log(config.port);
        }
        catch (e) {
            console.log(e);
        }
    });
});


process.on('SIGINT', (code) => {
    console.log('Server is stopped!');
    db.closeConnect(() => {
        console.log(`Server is stopped with code ${code}`);
        process.exit();
    });
});