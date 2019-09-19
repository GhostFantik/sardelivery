const methods = require('./VkAPI/methodsManager');
const OrderEmitter = require('./Socket.IO/Emitters/OrderEmitter');
const replies = require('./Bot/replies');

let users = {};
exports.getUserStatus = function (data) {
    if (data.from_id in users)
        return users[data.from_id].stage;
    else
        return -1
};
exports.addOrder = async function (data) {
    if (data.from_id in users) delete users[data.from_id];
    const userInfo = await methods.getUser(data.from_id);
    users[data.from_id] = {
        vkId: data.from_id,
        name: userInfo.response[0].last_name + ' ' + userInfo.response[0].first_name,
        address: undefined,
        body: undefined,
        paymentMethod: '-',
        stage: 0,
    };
};
exports.fillOrder = function (data) {
    if (data.from_id in users) {
        if (users[data.from_id].stage === 0) {
            users[data.from_id].address = data.text;
            users[data.from_id].stage = 1;
            return 1;
        }
        else if (users[data.from_id].stage === 1) {
            users[data.from_id].body = data.text;
            users[data.from_id].stage = 2;
            OrderEmitter.addOrder(users[data.from_id]);
            return 2;
        }
    }
    else return -1; // error!
};
exports.cancelOrder = function (data) {
    if (data.from_id in users) {
        if ('serverId' in users[data.from_id])
            OrderEmitter.rejectOrderByClient(users[data.from_id]);
        delete users[data.from_id];
    }
};
exports.confirmOrder = function (data) {
    if (data.from_id in users) {
        users[data.from_id].stage = 5;
        OrderEmitter.confirmOrder(users[data.from_id]);
    }
};
exports.setServerId = function(order) {
    if (order.vkId in users) {
        users[order.vkId].serverId = order.id;
    }
};
exports.setPriceOrder = function (order) {
  if (order.vkId in users) {
      users[order.vkId].price = order.price;
      users[order.vkId].stage = 4;
      replies.setPrice(order.vkId, order.price);
  }
  // TODO: make error sending to server!
};
exports.completeOrder = function (order) {
    if (order.vkId in users) {
        users[order.vkId].stage = 6;
        replies.completeOrder(order.vkId);
    }
};
exports.rejectOrderByAdmin = function (order) {
    if (order.vkId in users) {
        replies.rejectOrderByAdmin(order.vkId, order.comments);
        delete users[order.vkId];
    }
};
