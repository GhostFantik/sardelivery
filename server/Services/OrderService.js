'use strict';

const ModelInitializer = require('../Models/ModelInitializer');
const ValidationSchemes = require('../ValidationSchemes/OrderValidationSchemes');
const OrderEmitter = require('../Socket.IO/Emitters/OrderEmitter');
/**
 * @param obj Input data
 * @param obj.vkId Vk id
 * @param obj.name Name
 * @param obj.address Address
 * @param obj.body Order description
 * @param obj.paymentMethod Payment method
 * @param callback Callback
*/
exports.addOrder = function (obj, callback) { // TODO: make a VK notification for administrator
    ValidationSchemes.addOrderScheme.validate(obj, (err, value) => {if(err !== null) throw err;});
    let order = {
        vkId: obj.vkId,
        name: obj.name,
        address: obj.address,
        body: obj.body,
        paymentMethod: obj.paymentMethod,
        price: 0,
        status: 0,
    };
    ModelInitializer.Order.create(order)
        .then(res => callback(res))
        .catch(err => { throw err; });
};
/**
 *
 * @param obj Input data
 * @param obj.id Order id
 * @param obj.price Order price
 * @param callback Callback
 */
exports.setPriceOrder = function (obj, callback) {
    ValidationSchemes.setPriceOrderScheme.validate(obj, (err, value) => {if(err !== null) throw err;});
    let data = {
        price: obj.price,
        status: 1,
    };
    ModelInitializer.Order.update(data, {where: { id: obj.id }})
        .then(res => {
            callback(res);
            OrderEmitter.setPriceOrder(obj.id);
        })
        .catch(err => {throw err;});
};
/**
 *
 * @param obj
 * @param obj.id Id
 * @param callback
 */
exports.confirmOrder = function(obj, callback) {
    ValidationSchemes.confirmOrderScheme.validate(obj, (err, value) => {if(err !== null) throw err;});
    let data = {
        status: 2,
    };
    ModelInitializer.Order.update(data, {where: { id: obj.id }})
        .then(res => callback(res))
        .catch(err => {throw err;});
};
/**
 *
 * @param obj Input data
 * @param obj.id Order id
 * @param callback Callback
 */
exports.completeOrder = function (obj, callback) {
    ValidationSchemes.completeOrderScheme.validate(obj, (err, value) => {if(err !== null) throw err;});
    let data = {
        status: 3,
    };
    ModelInitializer.Order.update(data, {where: { id: obj.id }})
        .then(res => {
            callback(res);
            OrderEmitter.completeOrder(obj.id);
        })
        .catch(err => {throw err;});
};
/**
 *
 * @param obj
 * @param obj.id Id
 * @param callback
 */
exports.rejectOrderByClient = function (obj, callback) {
    ValidationSchemes.rejectOrderByClient.validate(obj, (err, value) => {if(err !== null) throw err;});
    let data = {
        status: 4,
    };
    ModelInitializer.Order.update(data, {where: { id: obj.id }})
        .then(res => callback(res))
        .catch(err => {throw err;});
};
/**
 *
 * @param obj Input data
 * @param obj.comments Comments
 * @param obj.id Id
 * @param callback Callback
 */
exports.rejectOrderByAdmin = function (obj, callback) {
    ValidationSchemes.rejectOrderScheme.validate(obj, (err, value) => {if(err !== null) throw err;});
    let data = {
        comments: obj.comments,
        status: 5,
    };
    ModelInitializer.Order.update(data, {where: { id: obj.id }})
        .then(res => {
            callback(res);
            OrderEmitter.rejectOrderByAdmin(obj.id);
        })
        .catch(err => {throw err;});
};
/**
 *
 * @param callback
 */
exports.getAllOrder = function(callback){
    ModelInitializer.Order.findAll({raw: true})
        .then(result => callback(result))
        .catch(err => {throw err;});
};
/**
 *
 * @param id
 * @param callback
 */
exports.getOrderById = function(id, callback){
    ValidationSchemes.getOrderById.validate({id: id}, (err, value) => {if(err !== null) throw err;});
    ModelInitializer.Order.findByPk(id)
        .then(result => callback(result))
        .catch(err => {throw err;});
};
/**
 *
 * @param status Status
 * @param callback
 */
exports.getAllOrderWithStatus = function(status, callback){
    ValidationSchemes.getAllOrderWithStatus.validate({status: status}, (err, value) => {if(err !== null) throw err;});
    ModelInitializer.Order.findAll({where: {status: status }, raw: true})
        .then(result => callback(result))
        .catch(err => {throw err;});
}