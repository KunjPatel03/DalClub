const express = require('express')
const router = express.Router();
const { checkToken } = require("../middleware/authMiddleware");
const{createUser,login} = require("../controllers/users.controller");


//router.post("/", checkToken, createUser);
router.post("/register",createUser);
router.post("/login", login);

module.exports=router;
