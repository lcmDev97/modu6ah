const express = require("express");
const router = express.Router();
const recruitCommentsController = require("../controller/recruitComments");

// 모집 댓글 등록 
router.post("/recruits/:postId/comments", recruitCommentsController.recruitComments);

// 모집 댓글 보기  
router.get("/recruits/:postId/comments", recruitCommentsController.recruitCommentsAllGet);

///api/places/:postId/comments/:commentId
router.delete("/recruits/:postId/comments/:commentId", recruitCommentsController.recruitCommentsDelete);

module.exports = router;