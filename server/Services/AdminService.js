'use strict';

const crypto = require('crypto');
const ModelInitializer = require('../Models/ModelInitializer');
const ValidationSchemes = require('../ValidationSchemes/AdminValidationScheme');

/**
 *
 * @param obj Input data
 * @param obj.username Username
 * @param obj.password Password
 */
exports.addAdmin = function (obj) {
    ValidationSchemes.addAdminScheme.validate(obj, (err, value) => {if(err !== null) throw err;});
    let admin = {
        username: obj.username,
        passwordHash: undefined,
        salt: undefined
    };
    admin.salt = crypto.randomBytes(256).toString('base64');
    admin.passwordHash = crypto.pbkdf2Sync(obj.password, admin.salt, 10000, 256, 'sha1')
        .toString('base64');
    if (admin.salt === undefined || admin.passwordHash === undefined) throw Error('Crypto Error');
    ModelInitializer.Admin.create(admin)
        .then(res => { return res; })
        .catch(err => { throw err; });
};
/**
 *
 * @param username Username
 */
exports.getAdminByUserName = async function (username) {
    ValidationSchemes.getAdminByUserName.validate({username: username}, (err, value) => {if(err !== null) throw err;});
    const admin = await ModelInitializer.Admin.findOne({where: {username}, raw: true});
    if (admin === null) return null;
    admin.checkPassword = function (password) {
        if (!password) return false;
        if (!this.passwordHash) return false;
        const key = crypto.pbkdf2Sync(password, this.salt, 10000, 256, 'sha1')
            .toString('base64');
        return key === this.passwordHash;
    };
    return admin;

};
/**
 *
 * @param id Id
 */
exports.getAdminById = async function (id) {
    ValidationSchemes.getAdminById.validate({id}, (err, value) => {if(err !== null) throw err;});
    return (await ModelInitializer.Admin.findByPk(id, {raw: true}));
};