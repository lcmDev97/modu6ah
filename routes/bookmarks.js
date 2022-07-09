const express = require("express");
const router = express.Router();
const bookmarkController = require("../controller/bookmarks");
const authMiddleware = require("../middlewares/authmiddleware");

// 모집 게시글 북마크 체크 기능
router.put("/recruits/bookmark/:recruitPostId", authMiddleware, bookmarkController.recruitBookmark);
// 모집 게시글 북마크 취소 기능
router.put("/recruits/unbookmark/:recruitPostId", authMiddleware, bookmarkController.recruitUnbookmark);
// 장소 추천 게시글 북마크 체크 기능
router.put("/places/bookmark/:placePostId", authMiddleware, bookmarkController.placeBookmark);
// 장소 추천 게시글 북마크 취소 기능
router.put("/places/unbookmark/:placePostId", authMiddleware, bookmarkController.placeUnbookmark);
// 육아용품 리뷰 게시글 북마크 체크 기능
router.put("/reviews/bookmark/:reviewPostId", authMiddleware, bookmarkController.reviewBookmark);
// 육아용품 리뷰 게시글 북마크 취소 기능
router.put("/reviews/unbookmark/:reviewPostId", authMiddleware, bookmarkController.reviewUnbookmark);

module.exports = router;