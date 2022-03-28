const express = require("express");
// const { getJobsList, getJob, applyJob } = require("../controllers/careers.controller");
const {
  getBlogList,
  getBlog,
  postBlog,
} = require("../controllers/blogs.controller");

const BlogsRouter = express.Router();

BlogsRouter.get("/", getBlogList);
BlogsRouter.get("/:blogId", getBlog);
BlogsRouter.post("/new", postBlog);

module.exports = BlogsRouter;
