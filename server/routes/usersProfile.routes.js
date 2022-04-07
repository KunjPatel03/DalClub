// @Author: Kunj Vijaykumar Patel
const express = require("express");
const {
  updateUserProfile
} = require("../controllers/usersProfile.controller");

const UsersProfileRouter = express.Router();

UsersProfileRouter.post("/update/:user_id", updateUserProfile);

module.exports = UsersProfileRouter;