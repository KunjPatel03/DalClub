// @Author: Anamika Ahmed
const { PackageModel } = require("../models");


// Function to fetch all exisitng packages
const getPackage = (req, res) => {
    PackageModel.findAll()
      .then((package) => {
        res.send({ success: true, package });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ success: false });
      });
  };
  
module.exports = {
    getPackage
};