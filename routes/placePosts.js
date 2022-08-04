const express = require("express");
const router = express.Router();
const placePostsController = require("../controller/placePosts");
const authMiddleware = require("../middlewares/authmiddleware");
const { placeImageUpload } = require('../middlewares/mainMulter');

// 장소추천 게시글 작성
router.post("/", authMiddleware, placeImageUpload.array('imageUrl', 3), placePostsController.placePosts);

// 장소추천 게시글 전체조회
router.get("/", placePostsController.placeAllGet);

// 장소추천 게시글 상세조회
router.get("/:placePostId", placePostsController.placeGet);

// 장소추천 게시글 수정
router.put("/:placePostId", authMiddleware, placePostsController.placeUpdate);

// 장소추천 게시글 삭제
router.delete("/:placePostId", authMiddleware, placePostsController.placeDelete);

// 장소추천 게시글 북마크 표시/해제
router.put("/bookmark/:placePostId", authMiddleware, placePostsController.placeBookmark);

module.exports = router;