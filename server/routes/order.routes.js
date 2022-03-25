const express = require('express');
const {
  findAllOrders,
  createOrder,
} = require('../controllers/order.contoller.js');

const OrderRouter = express.Router();

OrderRouter.get('/', findAllOrders);
OrderRouter.post('/new', createOrder);

module.exports = OrderRouter;
