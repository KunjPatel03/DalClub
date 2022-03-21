const { EventsModel, EventBookingsModel } = require("../models");
const { format, formatISO } = require("date-fns");
const DBConnection = require("../config/dbConfig");

const getEventList = (req, res) => {
  EventsModel.findAll({
    include: {
      model: EventBookingsModel,
      as: "eventBookings",
      attributes: ["bookedOn", "ticketType", "ticketsBooked"],
    },
  })
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

module.exports = {
  getEventList,
  getBookedEvents,
  bookEvent,
};
