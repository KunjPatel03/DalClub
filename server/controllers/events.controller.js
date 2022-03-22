const { EventsModel, EventBookingsModel } = require("../models");
const { Op } = require('sequelize')
const { format } = require("date-fns");
const DBConnection = require("../config/dbConfig");

const getEventList = (req, res) => {
  const {category, searchText} = req.body
  const conditionObject = {}
  if(category) conditionObject["category"] = category
  if(searchText) conditionObject["name"] = { [Op.like]: `%${searchText}%` }
  EventsModel.findAll({ where: conditionObject })
    .then((events) => {
      res.send({ success: true, events });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false });
    });
};

const getBookedEvents = (req, res) => {
  EventBookingsModel.findAll({
    include: { model: EventsModel, as: "event", attributes: ["id", "name"] },
  })
    .then((events) => {
      res.send({ success: true, events });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false });
    });
};

const bookEvent = async (req, res) => {
  const { eventId } = req.params;
  const { userId, ticketsBooked, ticketType, paymentStatus, amount } = req.body;
  const eventDetails = await EventsModel.findOne({ where: { id: eventId } }).then((data) => data).catch(() => null);
  if (eventDetails) {
    const {
      ticketLimit, remainingSilverSeats, remainingGoldSeats, remainingPlatinumSeats,
    } = eventDetails
    const userBookedEvents = await EventBookingsModel.findAll({
      where: { userId },
    }).then((bookings) => {
      const totalBookings = bookings.reduce(
        (prevValue, currentValue) => prevValue + currentValue.ticketsBooked, 0
      );
      return totalBookings
    }).catch(() => 0);
    if (userBookedEvents+ticketsBooked <= ticketLimit) {
      const remainingTickets = ticketType === "Silver" ? remainingSilverSeats
        : ticketType === "Gold" ? remainingGoldSeats
        : ticketType === "Platinum" ? remainingPlatinumSeats
        : 0;
      if(remainingTickets < ticketsBooked) {
        res.status(400).send({
          success: false,
          message: remainingTickets > 0 ? `Only ${remainingTickets} tickets are remaining for event.` : `Event is fully booked.`
        })
        return
      } else {
        let t = await DBConnection.transaction()
        try {
          const remainingTicketsField = ticketType === "Silver" ? "remainingSilverSeats"
            : ticketType === "Gold" ? "remainingGoldSeats"
            : ticketType === "Platinum" ? "remainingPlatinumSeats"
            : "";
          if(!remainingTicketsField) throw new Error();
          await eventDetails.update({
            [remainingTicketsField]: eventDetails[remainingTicketsField]-ticketsBooked
          }, { transaction: t })
          await EventBookingsModel.create({
            userId,
            eventId,
            ticketsBooked,
            amount,
            paymentStatus,
            ticketType,
            bookedOn: format(new Date(), "yyyy-MM-dd hh:mm:ss")
          }, { transaction: t })
          await t.commit()
          res.send({ success: true, message: "Tickets booked successfully." })
          return
        } catch(error) {
          console.log(error);
          t.rollback();
          res.status(500).send({ success: false, message: "Server error occured." })
          return
        }
      }
    } else {
      let difference = ticketLimit - userBookedEvents
      res.status(400).send({
        success: false,
        message: `Maximum user ticket limit has reached.${ difference ?
          ` You can only book ${difference} tickets.` : "" }`,
      });
      return
    }
  } else {
    res.status(404).send({ success: false, message: "Event not found." });
  }
};

const getEventDetails = (req, res) => {
  const { eventId="" } = req.params
  if(!eventId) {
    res.status(400).send({ success: false, message: "Event id is required." })
    return
  }
  EventsModel.findOne({ where: { id: eventId } }).then(eventDetails => {
    if(eventDetails) {
      res.send({ success: true, eventDetails })
    } else {
      res.status(404).send({ success: false, message: "Event not found." })
    }
  }).catch(err => {
    res.status(500).send({ success: false, message: "Something went wrong." })
  })
}

module.exports = {
  getEventList,
  getBookedEvents,
  bookEvent,
  getEventDetails
};
