const express = require("express");
const router = express.Router();
const mypageController = require("../controller/mypage");
const authMiddleware = require("../middlewares/authmiddleware");

// 프로필 조회
router.get("/mypage", authMiddleware, mypageController.profileGet);

// 북마크 게시글 조회
router.get("/mypage/bookmark", authMiddleware, mypageController.bookmark);

// 프로필 수정
router.put("/mypage/update", authMiddleware, mypageController.profileUpdate);

module.exports = router;