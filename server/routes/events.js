const express = require("express");
const { getEventList, getBookedEvents, bookEvent } = require("../controllers/events.controller");
const validateBookEvent = require("../validators/events.validator");

const EventRouter = express.Router();

EventRouter.get("/", getEventList);
EventRouter.get("/booked_events/:userId", getBookedEvents);
EventRouter.post("/book_event/:eventId", validateBookEvent("bookEvent"), bookEvent);

module.exports = EventRouter;
