const express = require("express");
const router = express.Router();
const recruitCommentsController = require("../controller/recruitComments");
const authMiddleware = require("../middlewares/authmiddleware");

// 모집 댓글 등록
router.post("/recruits/:recruitPostId/comments",authMiddleware, 
recruitCommentsController.recruitComments);

// 모집 댓글 삭제
router.delete("/recruits/:recruitPostId/comments/:recruitCommentId",authMiddleware, 
recruitCommentsController.recruitCommentsDelete);

// 모집 대댓글 등록  
router.post("/recruits/recomments/:recruitCommentId",authMiddleware, 
recruitCommentsController.recruitReCommentsCreate);

// 모집 대댓글 최신순 조회 
router.get("/recruits/recomments/:recruitCommentId",
recruitCommentsController.recruitReCommentsGet);




module.exports = router;