const { DataTypes } = require('sequelize');
const DBConnection = require('../config/dbConfig');
const Events = require("./events.model")
const EventBookings = require("./eventBookings.model")
const PaymentDetails = require("./paymentDetails.model")

const EventsModel = Events(DBConnection, DataTypes)
const EventBookingsModel = EventBookings(DBConnection, DataTypes)
const PaymentDetailsModel = PaymentDetails(DBConnection, DataTypes)

EventsModel.hasMany(EventBookingsModel, { foreignKey: "event_id", as: "eventBookings" })
EventBookingsModel.belongsTo(EventsModel, {as: "event"})

module.exports = {
  EventsModel,
  EventBookingsModel,
  PaymentDetailsModel
}