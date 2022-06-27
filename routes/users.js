require("dotenv").config();
const express = require("express");
const router = express.Router();
const userController = require("../controller/users")

// 회원가입
router.post("/signup", userController.signup) 

router.post("/signin", userController.signin)

module.exports = router;
