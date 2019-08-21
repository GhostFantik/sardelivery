'use strict';

const Joi = require('@hapi/joi');

exports.addAdminScheme = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
});
exports.getAdminByUserName = Joi.object().keys({
    username: Joi.string().required(),
});
exports.getAdminById = Joi.object().keys({
    id: Joi.number().required(), 
});