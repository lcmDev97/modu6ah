const express = require("express");
const router = express.Router();
const recruitCommentsController = require("../controller/recruitComments");
const authMiddleware = require("../middlewares/authmiddleware");

/**
 * 댓글 관련 코드 
 */

// 모집 댓글 등록
router.post("/recruits/:recruitPostId/comments",authMiddleware, 
recruitCommentsController.recruitComments);

// 모집 댓글 삭제
router.delete("/recruits/:recruitPostId/comments/:recruitCommentId",authMiddleware, 
recruitCommentsController.recruitCommentsDelete);

/**
 * 대댓글 관련 코드 
 * 도입 이유 : 댓글에 대한 comment를 달 수 있게 한다. 
 */

// 모집 대댓글 등록  
router.post("/recruits/recomments/:recruitCommentId",authMiddleware, 
recruitCommentsController.recruitReCommentsCreate);

// 모집 대댓글 최신순 조회 
router.get("/recruits/recomments/:recruitCommentId",
recruitCommentsController.recruitReCommentsGet);

// 모집 대댓글 삭제
router.delete("/recruits/:recruitCommentId/recomments/:recruitReCommentId",authMiddleware, 
recruitCommentsController.recruitReCommentsDelete);

module.exports = router;