const express = require("express");
const router = express.Router();
const mainsController = require("../controller/mains");

// 프로필 조회
router.get("/main", mainsController.mainPostGet);



module.exports = router;