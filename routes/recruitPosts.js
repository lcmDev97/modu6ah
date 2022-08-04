const express = require("express");
const router = express.Router();
const recruitPostsController = require("../controller/recruitPosts");
const authMiddleware = require("../middlewares/authmiddleware");

// 모집 게시글 작성
router.post("/", authMiddleware, recruitPostsController.recruitPosts);

// 모집 게시글 전체조회
router.get("/", recruitPostsController.recruitAllGet);

// 모집 게시글 상세조회
router.get("/:recruitPostId", recruitPostsController.recruitGet);

// 모집 게시글 수정
router.put("/:recruitPostId", authMiddleware, recruitPostsController.recruitUpdate);

// 모집 게시글 삭제
router.delete("/:recruitPostId", authMiddleware, recruitPostsController.recruitDelete);

// 모집 게시글 북마크 표시/해제
router.put("/bookmark/:recruitPostId", authMiddleware, recruitPostsController.recruitBookmark);

module.exports = router;