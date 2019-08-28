const methodsManager = require('../VkAPI/methodsManager');
const keyboards = require('./keyboards');
exports.setPrice = function (vkId, price) {
    methodsManager.sendMessage({
        id: vkId,
        text: `Заказ обработан! 
        Стоимость заказа ${price} рублей. 
        Подтвердите заказ с помощью кнопки "Подтвердить заказ!" или введите команду: /confirm
        Для отмены заказа нажмите кнопку "Отменить заказ!" или введите команду: /cancel`,
    }, keyboards.setPrice);
};
exports.completeOrder = function (vkId) {
  methodsManager.sendMessage({
      id: vkId,
      text: `Заказ выполнел! Обращайтесь к нам ещё!`
  }, keyboards.start);
};
exports.rejectOrderByAdmin = function (vkId, reason) {
    let text = 'Заказ отменен администратором!\n';
    if (reason !== '-')
        text += 'Причина: ' + reason;
  methodsManager.sendMessage({
      id: vkId,
      text: text,
  }, keyboards.start)
};