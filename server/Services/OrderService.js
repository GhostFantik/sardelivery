'use strict';
const ModelInitializer = require('../Models/ModelInitializer');
const ValidationSchemes = require('../ValidationSchemes/OrderValidationSchemes');
/**
 * @param obj Input data
 * @param obj.address Address
 * @param obj.body Order description
 * @param obj.paymentMethod Payment method
 * @param callback Callback
*/
exports.addOrder = function (obj, callback) { // TODO: make a VK notification for administrator
    ValidationSchemes.addOrderScheme.validate(obj, (err, value) => {if(err !== null) throw err;});
    let order = {
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
exports.confirmOrder = function (obj, callback) {
    ValidationSchemes.confirmOrderScheme.validate(obj, (err, value) => {if(err !== null) throw err;});
    let data = {
        price: obj.price,
        status: 1,
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
        status: 2,
    };
    ModelInitializer.Order.update(data, {where: { id: obj.id }})
        .then(res => callback(res))
        .catch(err => {throw err;});
};
/**
 *
 * @param obj Input data
 * @param obj.comments Comments
 * @param callback Callback
 */
exports.rejectOrder = function (obj, callback) {
    ValidationSchemes.rejectOrderScheme.validate(obj, (err, value) => {if(err !== null) throw err;});
    let data = {
        comments: obj.comments,
        status: 3,
    };
    ModelInitializer.Order.update(data, {where: { id: obj.id }})
        .then(res => callback(res))
        .catch(err => {throw err;});
};