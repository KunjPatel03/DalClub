const { EventsModel, EventBookingsModel, PaymentDetailsModel } = require("../models");
const { Op } = require('sequelize')
const { format, parseISO, add, isBefore, isAfter } = require("date-fns");
const DBConnection = require("../config/dbConfig");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getEventList = (req, res) => {
  const {category, searchText} = req.body
  const conditionObject = {
    eventDate: { [Op.gte]: new Date() },
    allowBookingDate: { [Op.lte]: new Date() },
    isActive: true
  }
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
  const { eventType } = req.body
  const whereObj = { userId: req.params.userId }
  if(eventType === "All"){
  } else if(eventType === "Past") {
    whereObj["$event.event_date$"] = { [Op.lt]: new Date() }
  } else {
    whereObj["$event.event_date$"] = { [Op.gte]: new Date() }
  }
  EventBookingsModel.findAll({
    where: whereObj,
    include: {
      model: EventsModel,
      as: "event",
      attributes: ["id", "name", "coverImage", "eventDate"]
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

const bookEvent = async (req, res) => {
  const { userId, paymentIntent, ticketType } = req.body;
  const paymentIntentDetails = await stripe.paymentIntents.retrieve(paymentIntent);
  const { metadata: { id, ticketsBooked }, amount } = paymentIntentDetails;
  const eventDetails = await EventsModel.findOne({ where: { id } }).then((data) => data).catch(() => null);
  if (eventDetails) {
    const {
      ticketLimit, remainingSilverSeats, remainingGoldSeats, remainingPlatinumSeats,
    } = eventDetails
    const userBookedEvents = await EventBookingsModel.findAll({
      where: { userId, eventId: id },
    }).then((bookings) => {
      const totalBookings = bookings.reduce(
        (prevValue, currentValue) => prevValue + currentValue.ticketsBooked, 0
      );
      return totalBookings
    }).catch(() => 0);
    if (parseInt(userBookedEvents)+parseInt(ticketsBooked) <= parseInt(ticketLimit)) {
      const remainingTickets = ticketType === "Silver" ? remainingSilverSeats
        : ticketType === "Gold" ? remainingGoldSeats
        : ticketType === "Platinum" ? remainingPlatinumSeats
        : 0;
      if(remainingTickets < ticketsBooked) {
        await stripe.refunds.create({
          amount, payment_intent: paymentIntent
        })
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
          let bookingObject = await EventBookingsModel.create({
            userId,
            eventId: id,
            ticketsBooked,
            amount,
            paymentStatus: "Recieved",
            ticketType,
            bookedOn: format(new Date(), "yyyy-MM-dd hh:mm:ss")
          }, { transaction: t })
          await PaymentDetailsModel.create({
            paymentIntent,
            module: "event",
            userId,
            moduleId: bookingObject.id
          }, { transaction: t })
          await t.commit()
          res.send({ success: true, message: "Tickets booked successfully." })
          return
        } catch(error) {
          console.log(error);
          t.rollback();
          await stripe.refunds.create({
            amount, payment_intent: paymentIntent
          })
          res.status(500).send({ success: false, message: "Server error occured." })
          return
        }
      }
    } else {
      let difference = ticketLimit - userBookedEvents
      await stripe.refunds.create({
        amount, payment_intent: paymentIntent
      })
      res.status(400).send({
        success: false,
        message: `Maximum user ticket limit has reached.${ difference ?
          ` You can only book ${difference} tickets.` : "" }`,
      });
      return
    }
  } else {
    await stripe.refunds.create({
      amount, payment_intent: paymentIntent
    })
    res.status(404).send({ success: false, message: "Event not found." });
  }
};

const getEventDetails = (req, res) => {
  const { eventId="", userId="" } = req.params
  if(!eventId) {
    res.status(400).send({ success: false, message: "Event id and user id are required." })
    return
  }
  EventsModel.findOne({ where: { id: eventId } }).then(async eventDetails => {
    if(eventDetails) {
      const userBookedEvents = await EventBookingsModel.findAll({
        where: { userId, eventId },
      }).then((bookings) => {
        const totalBookings = bookings.reduce(
          (prevValue, currentValue) => prevValue + currentValue.ticketsBooked, 0
        );
        return totalBookings
      }).catch(() => 0);
      res.send({ success: true, eventDetails: { ...eventDetails.dataValues, userBookedEvents } })
    } else {
      res.status(404).send({ success: false, message: "Event not found." })
    }
  }).catch(err => {
    res.status(500).send({ success: false, message: "Something went wrong." })
  })
}

const unregisterEvent = (req, res) => {
  PaymentDetailsModel.findOne({ where: { moduleId: req.params.bookingId } }).then(async details => {
    if(!details) throw new Error()
    let eventDetails = await EventBookingsModel.findOne({
      where: { id: req.params.bookingId },
      include: {
        model: EventsModel,
        as: "event",
      },
    })
    eventDetails = { ...eventDetails.dataValues, event: eventDetails.dataValues.event.dataValues }
    if(isBefore(add(new Date(), { hours: 1 }), parseISO(eventDetails.event.eventDate))) {
      res.status(400).send({ success: false, message: "Cannot unregister from event which are due less than hour." })
      return
    }
    const paymentIntentDetails = await stripe.paymentIntents.retrieve(details.paymentIntent);
    let { amount, metadata: { ticketsBooked } } = paymentIntentDetails
    if(req.body.tickets < ticketsBooked) {
      let amountToRefund = (amount / ticketsBooked) * req.body.tickets
      let t = await DBConnection.transaction()
      try{
        if(eventDetails.ticketsBooked === req.body.tickets) {
          await EventBookingsModel.destroy({ where: { id: req.params.bookingId } })
        } else {
          await EventBookingsModel.update({
            ticketsBooked: eventDetails.ticketsBooked - req.body.tickets,
            ticketsRefunded: eventDetails.ticketsRefunded + req.body.tickets,
          }, {
            where: { id: req.params.bookingId },
            transaction: t
          })
        }
        // take ticket type from event details and update overall type count
        const remainingTicketsField = eventDetails.ticketType === "Silver" ? "remainingSilverSeats"
          : ticketType === "Gold" ? "remainingGoldSeats" : "remainingPlatinumSeats"
        EventsModel.update({
          [remainingTicketsField]: parseInt(eventDetails["event"][remainingTicketsField]) + req.body.tickets
        }, {
          where: { id: eventDetails.event.id },
          transaction: t
        })
        await stripe.refunds.create({
          amount: amountToRefund, payment_intent: details.paymentIntent
        })
        await t.commit()
        res.send({ success: true, message: "Event unregistered successfully." })
        return
      } catch (error) {
        console.log(error);
        t.rollback()
        res.status(500).send({ success: false, message: "Something went wrong, please try again later." })
      }
    } else {
      res.status(400).send({ success: false, message: "Invalid tickets to register." })
    }
  }).catch(err => {
    res.status(500).send({ success: false, message: "Something went wrong." })
  })
  

}

module.exports = {
  getEventList,
  getBookedEvents,
  bookEvent,
  getEventDetails,
  unregisterEvent
};
