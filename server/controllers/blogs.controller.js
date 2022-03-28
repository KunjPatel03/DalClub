const { BlogsModel } = require("../models");

const getBlogList = (req, res) => {
  BlogsModel.findAll()
    .then((blogs) => {
      res.send({ success: true, blogs });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false });
    });
};

const getBlog = (req, res) => {
  BlogsModel.findOne({ where: { blog_id: req.params.blogId } })
    .then((blog) => {
      res.send({ success: true, blog });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false });
    });
};

const postBlog = (req, res) => {
  const blogPost = {
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    isVisible: req.body.isVisible,
  };
  BlogsModel.create(blogPost)
    .then((data) => {
      console.log(data);
      res.send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Job Application.",
      });
    });
};

module.exports = {
  getBlogList,
  postBlog,
  getBlog,
};
