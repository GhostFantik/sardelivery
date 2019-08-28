const OrderManager = require('../../OrderManager');

exports.initialize = function (io) {
    io.on('setPriceOrder', socket => {
        OrderManager.setPriceOrder(socket);
    });
    io.on('completeOrder', socket => {
       OrderManager.completeOrder(socket);
    });
    io.on('rejectOrderByAdmin', socket => {
       OrderManager.rejectOrderByAdmin(socket);
    });
};