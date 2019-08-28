const OrderService = require('../../Services/OrderService');

exports.initialize = function (io) {
    exports.setPriceOrder = function (orderId) {
        OrderService.getOrderById(orderId, res => io.emit('setPriceOrder', res));
    };
    exports.completeOrder = function (orderId) {
        OrderService.getOrderById(orderId, res => io.emit('completeOrder', res));
    };
    exports.rejectOrderByAdmin = function (orderId) {
        OrderService.getOrderById(orderId, res => io.emit('rejectOrderByAdmin', res));
    };
};