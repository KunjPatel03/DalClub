const express = require("express");
// const { getJobsList, getJob, applyJob } = require("../controllers/careers.controller");
const { getBlogList } = require("../controllers/blogs.controller");

const BlogsRouter = express.Router();

BlogsRouter.get("/", getBlogList);
// BlogsRouter.get("/:jobId", getJob);
// BlogsRouter.post("/applyJob", applyJob);

module.exports = BlogsRouter;