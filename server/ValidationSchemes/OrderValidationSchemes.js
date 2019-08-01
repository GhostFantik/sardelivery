'use strict';

const Joi = require('@hapi/joi');

exports.addOrderScheme = Joi.object().keys({
    address: Joi.string().required(),
    body: Joi.string().required(),
});
exports.confirmOrderScheme = Joi.object().keys({
    id: Joi.integer().required(),
    price: Joi.integer().required(),
});
exports.completeOrderScheme = Joi.object().keys({
    id: Joi.integer().required(),
});
exports.rejectOrderScheme = Joi.object().keys({
    id: Joi.integer().required(),
    comments: Joi.string(),
});