const express = require("express");
const router = express.Router();
const placeCommentsController = require("../controller/placeComments");
const authMiddleware = require("../middlewares/authmiddleware");

// 장소추천 댓글 등록
router.post("/:placePostId/comments", authMiddleware, placeCommentsController.placeComments);

// 장소추천 댓글 삭제
router.delete("/:placePostId/comments/:placeCommentId", authMiddleware, placeCommentsController.placeCommentsDelete);

/**
 * 대댓글 관련 코드 
 * 도입 이유 : 댓글에 대한 comment를 달 수 있게 한다. 
 */              

// 모집 대댓글 등록  
router.post("/recomments/:placeCommentId",authMiddleware, placeCommentsController.placeReCommentsCreate);

// 모집 대댓글 최신순 조회 
router.get("/recomments/:placeCommentId", placeCommentsController.placeReCommentsGet);

// 모집 대댓글 삭제
router.delete("/:placesCommentId/recomments/:placeReCommentId",authMiddleware, placeCommentsController.placeReCommentsDelete);

module.exports = router;