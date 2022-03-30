const { EventsModel, EventBookingsModel } = require("../models");
const DBConnection = require("../config/dbConfig");
const eventsModel = require("../models/events.model");
const { sequelize } = require("sequelize");
const { Result } = require("express-validator");
const { format, formatISO } = require("date-fns");
const read = require("body-parser/lib/read");

const getEvents = (req, res) => {
  // EventsModel.findAll({attributes: ["name","id","silverMemberSeats","goldMemberSeats","platinumMemberSeats","remainingSilverSeats","remainingGoldSeats","remainingPlatinumSeats"]
  EventsModel.findAll({
    attributes: [
      "id",
      "name",
      "allow_booking_date",
      "is_active"
      [
        DBConnection.literal(
          "(SUM(silver_member_seats)-SUM(remaining_silver_seats))"
        ),
        "Total_bookings",
      ],
    ],
    group: ["id"],
  })
    .then((events) => {
      res.status(200).send(events);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const addEvents = async (req, res) => {
  console.log(req.body);
  console.log(format(new Date(req.body.date2), "dd/MM/yyyy hh:mm "));
  await EventsModel.create({
    name: req.body.eventName,
    coverImage: null,
    category: req.body.select,
    description: req.body.EventDes,
    eventDate: format(new Date(req.body.date2), "yyyy-MM-dd hh:mm:ss"),
    allowBookingDate: format(new Date(req.body.date1), "yyyy-MM-dd hh:mm:ss"),
    isActive: 1,
    ticketLimit: req.body.mxs,
    silverMemberSeats: req.body.ss,
    goldMemberSeats: req.body.gs,
    platinumMemberSeats: req.body.ps,
    remainingSilverSeats: req.body.ss,
    remainingGoldSeats: req.body.gs,
    remainingPlatinumSeats: req.body.ps,
    silverMemberPrice: req.body.sp,
    goldMemberPrice: req.body.gp,
    platinumMemberPrice: req.body.pp,
  })
    .then((result) => {
      console.log("yes");
      res.status(200).send({ success: true, node: "event added" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const showUsers = (req, res) => {
  EventBookingsModel.findAll({
    where: { eventId: req.body.id },
    include: {
      model: EventsModel,
      as: "event",
      attributes: ["id", "name"],
    },
  })
    .then((users) => {
      console.log(users);
      res.send({ success: true, users: users });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false, users: [] });
    });
};

const deactivateEvent = (req, res) => {
  console.log(req.body.id);
  EventsModel.update({ isActive: 0 }, { where: { id: req.body.id } })
    .then(
      (result) => console.log(result)
      //  res.status(200)
    )
    .catch(
      (err) => console.log(err)
      //   res.send(500)
    );
};

const activateEvent = (req, res) => {
  EventsModel.update({ isActive: 1 }, { where: { id: req.body.id } })
    .then(
      (result) => console.log(result)
      //  res.status(200)
    )
    .catch(
      (err) => console.log(err)
      //   res.send(500)
    );
};

const deleteEvent = (req, res) => {
  console.log(req.body.id);
  EventsModel.destroy({ where: { id: req.body.id } })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};

const eventStatus = (req, res) => {
  EventsModel.findAll({
    attributes: ["is_active"],
    where: { id: req.body.id },
  })
    .then((events) => {
      console.log(events);
      res.status(200).send(events);
    })
    .catch((err) => {
      console.log(err);

      res.status(500).send(err);
    });
};
module.exports = {
  getEvents,
  addEvents,
  deactivateEvent,
  deleteEvent,
  showUsers,
  activateEvent,
  eventStatus,
};
// getEvents();
