const OrderService = require('../../Services/OrderService');

exports.initialize = function (io) {
    io.on('addOrder', async (socket, fn) => {
        const promise = new Promise((resolve => {
            OrderService.addOrder({
                vkId: socket.vkId,
                name: socket.name,
                address: socket.address,
                body: socket.body,
                paymentMethod: socket.paymentMethod,
            }, res => resolve(res));
        }));
        const result = await promise;
        fn(result);
    });
    io.on('confirmOrder', socket => {
        OrderService.confirmOrder({
            id: socket.serverId,
        }, () => {});
    });
    io.on('rejectOrderByClient', socket => {
        OrderService.rejectOrderByClient({
            id: socket.serverId,
        }, () => {});
    });
};
