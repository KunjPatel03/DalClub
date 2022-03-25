const { CareersModel } = require("../models");

const getJobsList = (req, res) => {

  CareersModel.findAll()
    .then((jobs) => {
      res.send({ success: true, jobs });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false });
    });
};

module.exports = {
    getJobsList
  };