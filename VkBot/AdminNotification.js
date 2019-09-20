const config = require('./config');
const methods = require('./VkAPI/methodsManager');

exports.newOrder = async function (order) {
    const response = await methods.sendMessage({
        chatId: config.Vk.chat_id,
        text: `Внимание! Новый заказ! Срочно обработать!
                Данные заказа: 
                    vkId - ${order.vkId}
                    Name - ${order.name}
                    Address - ${order.address}
                    Body - ${order.body}
                    Payment Method - ${order.paymentMethod}`,
    });
};
exports.cancelOrder = async function (order) {
    const response = await methods.sendMessage({
        chatId: config.Vk.chat_id,
        text: `Внимание! Заказ ОТМЕНЁН!
                Данные заказа:
                    vkId - ${order.vkId}
                    Name - ${order.name}
                    Address - ${order.address}
                    Body - ${order.body}
                    Payment Method - ${order.paymentMethod}`,
    })
};
exports.confirmOrder = async function (order) {
    const response = await methods.sendMessage({
        chatId: config.Vk.chat_id,
        text: `Внимание! Клиент ПОДТВЕРДИЛ заказ!
                Данные заказа:
                    vkId - ${order.vkId}
                    Name - ${order.name}
                    Address - ${order.address}
                    Body - ${order.body}
                    Payment Method - ${order.paymentMethod}
                    Price - ${order.price}`,
    });
};