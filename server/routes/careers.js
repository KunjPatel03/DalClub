const express = require("express");
const { getJobsList, getJob, applyJob, addJob, deleteJob, updateJob, getApplications } = require("../controllers/careers.controller");

const CareersRouter = express.Router();

CareersRouter.get("/", getJobsList);
CareersRouter.get("/:jobId", getJob);
CareersRouter.post("/applyJob", applyJob);
CareersRouter.post("/addJob", addJob);
CareersRouter.delete("/:jobId", deleteJob);
CareersRouter.post("/updateJob/:jobId", updateJob);
CareersRouter.get("/applications/:jobId", getApplications);

module.exports = CareersRouter;