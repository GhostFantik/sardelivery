const OrderManager = require('../../OrderManager');

exports.initialize = function (io) {
  exports.addOrder = function (order) {
      io.emit('addOrder', order, data => {
            OrderManager.setServerId(data);
      });
  };
  exports.confirmOrder = function (order) {
      io.emit('confirmOrder', { serverId: order.serverId });
  }
  exports.rejectOrderByClient = function (order) {
      io.emit('rejectOrderByClient', {serverId : order.serverId });
  };
};