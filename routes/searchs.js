const express = require("express");
const router = express.Router();
const searchsController = require("../controller/searchs");
const authMiddleware = require("../middlewares/authmiddleware");

// 전체검색
router.get("/search", searchsController.searchAll);

//모집게시글에서만 검색
router.get("/search/recruits", searchsController.searchRecruit);
// //장소추천게시글에서만 검색
// router.get("/search/places", searchsController.searchAll);
// //육아템리뷰게시글에서만 검색
// router.get("/search/reviews", searchsController.searchAll);


module.exports = router;