const express = require("express");
// const { getJobsList, getJob, applyJob } = require("../controllers/careers.controller");
const { getBlogList,getBlog } = require("../controllers/blogs.controller");

const BlogsRouter = express.Router();

BlogsRouter.get("/", getBlogList);
BlogsRouter.get("/:blogId", getBlog);
// BlogsRouter.post("/applyJob", applyJob);

module.exports = BlogsRouter;