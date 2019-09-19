const config = require('./config');
const methods = require('./VkAPI/methodsManager');

exports.newOrder = async function(data) {
    console.log('NOTIFICATION');
    await methods.sendMessage({
        id: config.Vk.admin_id,
        text: `Внимание! Новый заказ! Срочно обработать!
                Data: ${data}`,
    });
};