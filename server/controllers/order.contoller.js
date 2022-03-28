const {
  OrderHeaderModel,
  OrderLineModel,
  ProductModel,
  PaymentDetailsModel,
} = require('../models');
const Sequelize = require('sequelize');
const DBConnection = require('../config/dbConfig');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createOrder = async (req, res) => {
  const order_header = {
    order_user_id: req.body.order_user_id,
    order_total: req.body.order_total,
    order_payment_id: req.body.order_payment_id,
    order_status: req.body.order_status,
    order_line: req.body.order_line,
  };

  let t = await DBConnection.transaction();
  try {
    let order = await OrderHeaderModel.create(
      order_header,
      {
        include: [{ model: OrderLineModel, as: 'order_line' }],
      },
      { transaction: t }
    );

    const promises = order_header.order_line.map((line) => {
      return ProductModel.update(
        {
          product_quantity: Sequelize.literal(
            `product_quantity - ${line.order_product_quantity}`
          ),
        },
        { where: { product_id: line.order_product_id } },
        { transaction: t }
      );
    });

    await Promise.all(promises);

    await PaymentDetailsModel.create(
      {
        paymentIntent: req.body.order_payment_intent_id,
        module: 'order',
        userId: req.body.order_user_id,
        moduleId: order.order_header_id,
      },
      { transaction: t }
    );

    await t.commit();

    res.send({ success: true, message: 'Order Booked Successfully.' });
  } catch (error) {
    console.log(error);
    t.rollback();

    await stripe.refunds.create({
      amount: req.body.order_total,
      payment_intent: req.body.order_payment_intent_id,
    });

    res.status(500).send({ success: false, message: 'Server error occured.' });
    return;
  }
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
