const express = require("express");
const { getJobsList } = require("../controllers/careers.controller");
//const validateBookEvent = require("../validators/events.validator");

const CareersRouter = express.Router();

CareersRouter.get("/", getJobsList);

module.exports = CareersRouter;