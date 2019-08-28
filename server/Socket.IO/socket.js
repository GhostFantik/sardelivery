let io = require('socket.io');
const OrderListener = require('./Listeners/OrderListener');
const OrderEmitter = require('./Emitters/OrderEmitter');

function InitEmitters(socket) {
    OrderEmitter.initialize(socket);
}
function InitListeners(socket) {
    OrderListener.initialize(socket);
}

exports.initialize = function (server) {
    io = io(server);
    console.log('Socket was initialized!');
    io.on('connection', socket => {
        console.log('VkBot was connected!');
        InitEmitters(socket);
        InitListeners(socket);
    });
    io.on('disconnect', socket => {
        console.log('VkBot was disconnected!');
    });
};
exports.get = function () {
    return io;
};

