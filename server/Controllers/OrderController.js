'use strict';

const router = require('express').Router();
const OrderService = require('../Services/OrderService');

router.get('/', (req, res) => {
    if(req.query.status === undefined)
        OrderService.getAllOrder(result => res.json(result));
    else
        OrderService.getAllOrderWithStatus(Number(req.query.status), result => res.json(result));
});
router.get('/:id', (req, res) => {
    OrderService.getOrderById(Number(req.params['id']), result => {
        if(result === null)
            res.json({});
        else
            res.json(result);
    });
});
router.post('/', (req, res) => {
    let obj = {
        name: req.body.name,
        address: req.body.address,
        body: req.body.body,
        paymentMethod: req.body.paymentMethod,
    };
    OrderService.addOrder(obj, result => res.json(result));
});
router.post('/setPrice', (req, res) => {
    let obj = {
        id: req.body.id,
        price: req.body.price,
    };
    OrderService.setPriceOrder(obj, result => res.json(result));
});
router.post('/confirm', (req, res) => {
    let obj = {
        id: req.query.id,
    };
    OrderService.setPriceOrder(obj, result => res.json(result));
});
router.post('/complete', (req, res) => {
    let obj = {
        id: req.query.id,
    };
    OrderService.completeOrder(obj, result => res.json(result));
});
router.post('/rejectByClient', (req, res) => {
    let obj = {
        id: req.body.id,
    };
    OrderService.rejectOrderByClient(obj, result => res.json(result));
});
router.post('/rejectByAdmin', (req, res) => {
    let obj = {
        id: req.body.id,
        comments: req.body.comments,
    };
    OrderService.rejectOrderByAdmin(obj, result => res.json(result));
});
module.exports = router;