const commandsManager = require('../VkAPI/commandsManager');
const methodsManager = require('../VkAPI/methodsManager');
const orderManager = require('../OrderManager');
const keyboards = require('./keyboards');

exports.initialize = function () {
    commandsManager.on('/start', async data => {
        if (orderManager.getUserStatus(data) === -1){
            const response = await methodsManager.sendMessage({
                id: data.from_id,
                text: `Привет! 
            Чтобы оформить доставку нажми на кнопку "Заказать" или введи команду /order
            Для отмены заказа введи команду /cancel`,
            }, keyboards.start);
        }
        else {
            const response = await methodsManager.sendMessage({
                id: data.from_id,
                text: `Вы уже в процессе оформления заказа! Если это не так, то обратитесь к Администратору!
                Информация для администратора:
                Status: ${orderManager.getUserStatus(data)}`,
            });
        }
    });
    commandsManager.on('/order', async data => {
        if (orderManager.getUserStatus(data) !== -1){
            await methodsManager.sendMessage({
                id: data.from_id,
                text: `Вы уже в стадии оформления заказа!`,
            });
            return;
        }
        await orderManager.addOrder(data);
        await methodsManager.sendMessage({
            id: data.from_id,
            text: `Внимание! Началась процедура оформления заказа!
       Укажите адрес доставки ОДНИМ сообщением!
       Информация для администратора:
                Status: ${orderManager.getUserStatus(data)}`,
        }, keyboards.order);
    });
    commandsManager.on('/help', async data => {
        const response = await methodsManager.sendMessage({
            id: data.from_id,
            text: `Напишите /start для начала работы!
                Администратор по технической части: vk.com/ghostfantik`,
        })
    });
    commandsManager.on('/cancel', async data => {
        if (orderManager.getUserStatus(data) === -1){
            await methodsManager.sendMessage({
                id: data.from_id,
                text: `Вы не оформляли заказ!
                Информация для администратора:
                Status: ${orderManager.getUserStatus(data)}`,
            });
            return;
        }
        orderManager.cancelOrder(data);
        const response = await methodsManager.sendMessage({
            id: data.from_id,
            text: 'Заказ отменен!',
        }, keyboards.start);
    });
    commandsManager.on('/confirm', async data => {
        if (orderManager.getUserStatus(data) !== 4){
            await methodsManager.sendMessage({
                id: data.from_id,
                text: `В данный момент невозможно подтвердить заказ! Возможно ваш заказ находится в режиме 
                подтверждения администратором, или вы не прошли процедуру оформления заказа!
                
                Информация для администратора:
                Status: ${orderManager.getUserStatus(data)}`,
            });
            return;
        }
        orderManager.confirmOrder(data);
        const response = await methodsManager.sendMessage({
            id: data.from_id,
            text: 'Заказ принят в исполнение!'
        }, keyboards.confirm);
    });
    commandsManager.on('nocmd', async data => {
        const code = orderManager.fillOrder(data);
        if (code === 1) await methodsManager.sendMessage({
            id: data.from_id,
            text: `Адрес записан! 
    Пожалуйста, опишите максимально подробно ваш заказ ОДНИМ сообщением!`
        });
        else if (code === 2) await methodsManager.sendMessage({
            id: data.from_id,
            text: `Заказ добавлен в очередь на проверку! Ожидайте!
       После обработки заказа Вам станет известна стоимость заказа!`
        });
        else if (code === -1) await methodsManager.sendMessage({
            id: data.from_id,
            text: `Не понимаю Вас! Чтобы узнать мои возможности, напишите /help`,
        });
    });
    commandsManager.on('other', async data => {
        const response = await methodsManager.sendMessage({
            id: data.from_id,
            text: 'Не понимаю Вас! \'/Help\' - для просмотра доступных комманд!',
        })
    });
};