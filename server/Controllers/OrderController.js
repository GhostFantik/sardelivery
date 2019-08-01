'use strict';

const router = require('express').Router();
const OrderService = require('../Services/OrderService');

router.get('/', (req, res) => {
    OrderService.getAllOrder(result => res.json(result));
});
router.get('/:id', (req, res) => {
    OrderService.getOrderById(req.params['id'], result => {
        if(result === null)
            res.json({});
        else
            res.json(result);
    });
});
router.post('/', (req, res) => {
    let obj = {
        address: req.body.address,
        body: req.body.body,
        paymentMethod: req.body.paymentMethod,
    };
    OrderService.addOrder(obj, result => res.json(result));
});
router.update('/confirm', (req, res) => {
    let obj = {
        id: req.body.id,
        price: req.body.price,
    };
    OrderService.confirmOrder(obj, result => res.json(result));
});
router.update('/completeOrder', (req, res) => {
    let obj = {
        id: req.query.id,
    };
    OrderService.completeOrder(obj, result => res.json(result));
});
router.update('/rejectOrder', (req, res) => {
    let obj = {
        id: req.body.id,
        comments: req.body.comments,
    };
    OrderService.rejectOrder(obj, result => res.json(result));
});
module.exports = router;