const express = require("express");
const { getJobsList, getJob, applyJob, addJob, deleteJob } = require("../controllers/careers.controller");

const CareersRouter = express.Router();

CareersRouter.get("/", getJobsList);
CareersRouter.get("/:jobId", getJob);
CareersRouter.post("/applyJob", applyJob);
CareersRouter.post("/addJob", addJob);
CareersRouter.get("/deleteJob/:jobId", deleteJob);

module.exports = CareersRouter;