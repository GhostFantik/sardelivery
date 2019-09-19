const config = require('./config');
const methods = require('./VkAPI/methodsManager');

exports.newOrder = async function(data) {
    const response = await methods.sendMessage({
        chatId: config.Vk.chat_id,
        text: `Внимание! Новый заказ! Срочно обработать!
                Data: ${data}`,
    });
};