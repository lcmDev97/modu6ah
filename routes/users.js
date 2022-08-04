require("dotenv").config();
const express = require("express");
const router = express.Router();
const userController = require("../controller/users");

// 회원가입
router.post("/signup", userController.signup);

router.post("/signin", userController.signin);

router.post("/signup/emailCheck", userController.emailCheck);

router.post("/signup/nicknameCheck", userController.nicknameCheck);

router.post("/kakao/member", userController.kakao_member);

router.post("/kakao/parsing", userController.kakao_parsing);

router.post("/signup/authMail", userController.sendMail);

module.exports = router;