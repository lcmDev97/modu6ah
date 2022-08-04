const express = require("express");
const router = express.Router();
const searchsController = require("../controller/searchs");
const authMiddleware = require("../middlewares/authmiddleware");

// 전체검색
router.get("/", searchsController.searchAll);

// 모집 게시글에서만 검색
router.get("/recruits", searchsController.searchRecruit);

// 장소추천 게시글에서만 검색
router.get("/places", searchsController.searchPlace);

// 육아템리뷰 게시글에서만 검색
router.get("/reviews", searchsController.searchReview);

module.exports = router;
