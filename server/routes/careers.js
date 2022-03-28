const express = require("express");
const { getJobsList, getJob, applyJob, addJob, deleteJob, updateJob } = require("../controllers/careers.controller");

const CareersRouter = express.Router();

CareersRouter.get("/", getJobsList);
CareersRouter.get("/:jobId", getJob);
CareersRouter.post("/applyJob", applyJob);
CareersRouter.post("/addJob", addJob);
CareersRouter.get("/deleteJob/:jobId", deleteJob);
CareersRouter.post("/updateJob/:jobId", updateJob);

module.exports = CareersRouter;