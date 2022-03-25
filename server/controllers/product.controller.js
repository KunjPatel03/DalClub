const {
  ProductModel,
  ProductSizeModel,
  ProductColorModel,
} = require('../models');

exports.findAllProducts = (req, res) => {
  ProductModel.findAll({
    where: { product_isactive: true },
    include: [
      { model: ProductColorModel, as: 'product_color' },
      { model: ProductSizeModel, as: 'product_size' },
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

exports.findAProduct = (req, res) => {
  const product_id = req.params.id;
  console.log(product_id);
  ProductModel.findByPk(product_id, {
    include: [
      { model: ProductColorModel, as: 'product_color' },
      { model: ProductSizeModel, as: 'product_size' },
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
