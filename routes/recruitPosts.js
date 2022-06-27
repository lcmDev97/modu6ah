const express = require("express");
const router = express.Router();
const recruitPostsController = require("../controller/recruitPosts");
// const authMiddleware = require("../middlewares/authmiddleware");

// 모집 게시글 작성(로그인 부분 완료되면 authMiddleware 넣을 예정)
router.post("/recruits", recruitPostsController.recruitPosts);

// 모집 게시글 전체조회
router.get("/recruits", recruitPostsController.recruitAllGet);

// 모집 게시글 상세조회
router.get("/recruits/:postId", recruitPostsController.recruitGet);

// 모집 게시글 수정(로그인 부분 완료되면 authMiddleware 넣을 예정)
router.put("/recruits/:postId", recruitPostsController.recruitUpdate);

// 모집 게시글 삭제(로그인 부분 완료되면 authMiddleware 넣을 예정)
router.delete("/recruits/:postId", recruitPostsController.recruitDelete);

module.exports = router;