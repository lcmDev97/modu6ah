const express = require("express");
const router = express.Router();
const reviewPostsController = require("../controller/reviewPosts");
const authMiddleware = require("../middlewares/authmiddleware");
const { reviewImageUpload } = require('../middlewares/mainMulter');

// 육아용품 리뷰 게시글 작성
router.post("/", authMiddleware, reviewImageUpload.array('imageUrl', 3), reviewPostsController.reviewPosts);

// 육아용품 리뷰 게시글 전체조회
router.get("/", reviewPostsController.reviewAllGet);

// 육아용품 리뷰 게시글 상세조회
router.get("/:reviewPostId", reviewPostsController.reviewGet);

// 육아용품 리뷰 게시글 수정
router.put("/:reviewPostId", authMiddleware, reviewPostsController.reviewUpdate);

// 육아용품 리뷰 게시글 삭제
router.delete("/:reviewPostId", authMiddleware, reviewPostsController.reviewDelete);

// 육아용품 리뷰 게시글 북마크 표시/해제
router.put("/bookmark/:reviewPostId", authMiddleware, reviewPostsController.reviewBookmark);

module.exports = router;