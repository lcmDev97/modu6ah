const express = require("express");
const router = express.Router();
const mypagesController = require("../controller/mypages");
const authMiddleware = require("../middlewares/authmiddleware");
const { profileUpload } = require('../middlewares/profileMulter');

// 프로필 조회
router.get("/mypage/profile/:nickname", mypagesController.profileGet);

// 북마크 전체게시글 조회
router.get("/mypage/bookmark", authMiddleware, mypagesController.myBookmark);
// 북마크 모집게시글 조회
router.get("/mypage/bookmark/recruits", authMiddleware, mypagesController.myBookmarkRecruit);
// 북마크 장소추천게시글 조회
router.get("/mypage/bookmark/places", authMiddleware, mypagesController.myBookmarkPlace);
// 북마크 리뷰게시글 조회
router.get("/mypage/bookmark/reviews", authMiddleware, mypagesController.myBookmarkReview);

// 프로필 수정
router.put("/mypage/update", authMiddleware, profileUpload.single('profileUrl'), mypagesController.profileUpdate);

module.exports = router;