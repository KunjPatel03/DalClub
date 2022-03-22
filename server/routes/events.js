const express = require("express");
const { getEventList, getBookedEvents, bookEvent, getEventDetails } = require("../controllers/events.controller");
const validateBookEvent = require("../validators/events.validator");

const EventRouter = express.Router();

EventRouter.post("/", getEventList);
EventRouter.get("/eventDetails/:eventId", getEventDetails);
EventRouter.get("/booked_events/:userId", getBookedEvents);
EventRouter.post("/book_event/:eventId", validateBookEvent("bookEvent"), bookEvent);

module.exports = EventRouter;
