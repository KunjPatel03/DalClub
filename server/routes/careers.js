const express = require("express");
const { getJobsList, getJob, applyJob } = require("../controllers/careers.controller");

const CareersRouter = express.Router();

CareersRouter.get("/", getJobsList);
CareersRouter.get("/:jobId", getJob);
CareersRouter.post("/applyJob", applyJob);

module.exports = CareersRouter;