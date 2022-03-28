// @Author: Kishan Thakkar
const { DataTypes } = require('sequelize');
const DBConnection = require('../config/dbConfig');
const Events = require("./events.model")
const EventBookings = require("./eventBookings.model")
const PaymentDetails = require("./paymentDetails.model")
const OrderHeader = require('./orderheader.model.js');
const OrderLine = require('./orderline.model.js');
const Product = require('./product.model.js');
const ProductSize = require('./productsize.model.js');
const ProductColor = require('./productcolor.model.js');
const Careers= require("./careers.model");

const EventsModel = Events(DBConnection, DataTypes);
const EventBookingsModel = EventBookings(DBConnection, DataTypes);
const PaymentDetailsModel = PaymentDetails(DBConnection, DataTypes);
const OrderHeaderModel = OrderHeader(DBConnection, DataTypes);
const OrderLineModel = OrderLine(DBConnection, DataTypes);
const ProductModel = Product(DBConnection, DataTypes);
const ProductSizeModel = ProductSize(DBConnection, DataTypes);
const ProductColorModel = ProductColor(DBConnection, DataTypes);
const CareersModel = Careers(DBConnection, DataTypes) 


EventsModel.hasMany(EventBookingsModel, {
  foreignKey: 'event_id',
  as: 'eventBookings',
});
EventBookingsModel.belongsTo(EventsModel, { as: 'event' });

OrderHeaderModel.hasMany(OrderLineModel, {
  as: 'order_line',
  foreignKey: 'order_header_id',
});

OrderLineModel.belongsTo(OrderHeaderModel, {
  foreignKey: 'order_header_id',
});

OrderLineModel.belongsTo(ProductModel, {
  foreignKey: 'order_product_id',
  targetKey: 'product_id',
});

ProductModel.hasOne(OrderLineModel, {
  foreignKey: 'order_product_id',
  sourceKey: 'product_id',
});

ProductModel.hasMany(ProductSizeModel, {
  as: 'product_size',
  foreignKey: 'product_id',
});
ProductSizeModel.belongsTo(ProductModel, {
  foreignKey: 'product_id',
});

ProductModel.hasMany(ProductColorModel, {
  as: 'product_color',
  foreignKey: 'product_id',
});
ProductColorModel.belongsTo(ProductModel, {
  foreignKey: 'product_id',
});

module.exports = {
  EventsModel,
  EventBookingsModel,
  PaymentDetailsModel,
  OrderHeaderModel,
  OrderLineModel,
  ProductModel,
  ProductColorModel,
  ProductSizeModel,
  CareersModel
};