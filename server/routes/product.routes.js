const express = require('express');
const {
  findAllProducts,
  findAProduct,
} = require('../controllers/product.controller.js');

const ProductRouter = express.Router();

ProductRouter.get('/', findAllProducts);
ProductRouter.get('/:id', findAProduct);

module.exports = ProductRouter;
