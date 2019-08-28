const config = require('../config');
const io = require('socket.io-client').connect(config.server);
const OrderEmitter = require('./Emitters/OrderEmitter');
const OrderListener = require('./Listeners/OrderListener');
OrderEmitter.initialize(io);
OrderListener.initialize(io);
