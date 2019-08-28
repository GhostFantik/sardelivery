'use strict';

const Joi = require('@hapi/joi');

exports.addOrderScheme = Joi.object().keys({
    vkId: Joi.number().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    body: Joi.string().required(),
    paymentMethod: Joi.string(),
});
exports.setPriceOrderScheme = Joi.object().keys({
    id: Joi.number().required(),
    price: Joi.number().required(),
});
exports.confirmOrderScheme = Joi.object().keys({
    id: Joi.number().required(),
});

exports.completeOrderScheme = Joi.object().keys({
    id: Joi.number().required(),
});
exports.rejectOrderByClient = Joi.object().keys({
    id: Joi.number().required(),
});
exports.rejectOrderScheme = Joi.object().keys({
    id: Joi.number().required(),
    comments: Joi.string(),
});
exports.getOrderById = Joi.object().keys({
    id: Joi.number().required(),
});
exports.getAllOrderWithStatus = Joi.object().keys({
    status: Joi.number().required(),
});