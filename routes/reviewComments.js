const express = require("express");
const router = express.Router();
const reviewCommentsController = require("../controller/reviewComments.js");
const authMiddleware = require("../middlewares/authmiddleware");

// 육아용품 리뷰 댓글 등록
router.post("/reviews/:reviewPostId/comments", authMiddleware, reviewCommentsController.reviewComments);

// 육아용품 리뷰 댓글 삭제
router.delete("/reviews/:reviewPostId/comments/:reviewCommentId", authMiddleware, reviewCommentsController.reviewCommentsDelete);

/**
 * 대댓글 관련 코드 
 * 도입 이유 : 댓글에 대한 comment를 달 수 있게 한다. 
 */          

// 리뷰 대댓글 등록  
router.post("/reviews/recomments/:reviewCommentId", authMiddleware, reviewCommentsController.reviewReCommentsCreate);

module.exports = router;