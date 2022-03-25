const express = require("express");
const { getEventList, getBookedEvents, bookEvent, getEventDetails } = require("../controllers/events.controller");
const validateBookEvent = require("../validators/events.validator");

const EventRouter = express.Router();

EventRouter.post("/", getEventList);
EventRouter.get("/event/:eventId/details/:userId", getEventDetails);
EventRouter.get("/bookedEvents/:userId", getBookedEvents);
EventRouter.post("/bookEvent", validateBookEvent("bookEvent"), bookEvent);

module.exports = EventRouter;
