const { OrderHeaderModel, OrderLineModel, ProductModel } = require('../models');
const Sequelize = require('sequelize');

exports.createOrder = (req, res) => {
  const order_header = {
    order_user_id: req.body.order_user_id,
    order_total: req.body.order_total,
    order_payment_id: req.body.order_payment_id,
    order_status: req.body.order_status,
    order_line: req.body.order_line,
  };

  OrderHeaderModel.create(order_header, {
    include: [{ model: OrderLineModel, as: 'order_line' }],
  })
    .then((data) => {
      const promises = order_header.order_line.map((line) => {
        return ProductModel.update(
          {
            product_quantity: Sequelize.literal(
              `product_quantity - ${line.order_product_quantity}`
            ),
          },
          { where: { product_id: line.order_product_id } }
        );
      });
      Promise.all(promises)
        .then(() => res.send(data))
        .catch((err) => res.status(500).send({ message: err.message }));
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Order.',
      });
    });
};

exports.findAllOrders = (req, res) => {
  OrderHeaderModel.findAll({
    where: { order_user_id: req.query.order_user_id },
    include: [
      {
        model: OrderLineModel,
        as: 'order_line',
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving products.',
      });
    });
};
