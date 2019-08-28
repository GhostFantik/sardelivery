'use strict';

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config');

// const AdminService = require('../Services/AdminService');
//
// router.post('/add', (req, res) => {
//     const r = AdminService.addAdmin(req.body);
//     console.log('Return ' + r);
//     res.status(200).end();
// });
router.post('/login', passport.authenticate('local', {session: false}),
    (req, res) => {
        if (req.user === null || req.user === false) res.send('Login failed!');
        else {
            const payload = {
                id: req.user.id,
                username: req.user.username,
            };
            const token = jwt.sign(payload, config.jwtSecretKey);
            res.set('auth_token', token);
            res.status(200).json(token);
        }
    });
module.exports = router;