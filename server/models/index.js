const { DataTypes } = require('sequelize');
const DBConnection = require('../config/dbConfig');
const Events = require("./events.model")
const EventBookings = require("./eventBookings.model")

const EventsModel = Events(DBConnection, DataTypes)
const EventBookingsModel = EventBookings(DBConnection, DataTypes)

EventsModel.hasMany(EventBookingsModel, { foreignKey: "event_id", as: "eventBookings" })
EventBookingsModel.belongsTo(EventsModel, {as: "event"})

module.exports = {
  EventsModel,
  EventBookingsModel
}