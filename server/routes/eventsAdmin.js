const express = require("express");
const {
  getEvents,
  addEvents,
  deactivateEvent,
  deleteEvent,
  showUsers,
  activateEvent,
  eventStatus
} = require("../controllers/eventsAdmin.controller");

const EventAdminRouter = express.Router();

EventAdminRouter.get("/list_events", getEvents);
EventAdminRouter.post("/add-event", addEvents);
EventAdminRouter.post("/deactivate-event", deactivateEvent);
EventAdminRouter.post("/delete-event", deleteEvent);
EventAdminRouter.post("/booked-users", showUsers);
EventAdminRouter.post("/activate-event", activateEvent);
EventAdminRouter.post("/status", eventStatus);


module.exports = EventAdminRouter;
