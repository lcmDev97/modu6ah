const express = require("express");
const router = express.Router();
const bookmarkController = require("../controller/bookmarks");
const authMiddleware = require("../middlewares/authmiddleware");

router.put("/recruits/bookmark/:recruitPostId", authMiddleware, bookmarkController.recruitBookmark);
router.put("/recruits/unbookmark/:recruitPostId", authMiddleware, bookmarkController.recruitUnbookmark);
router.put("/places/bookmark/:placePostId", authMiddleware, bookmarkController.placeBookmark);
router.put("/places/unbookmark/:placePostId", authMiddleware, bookmarkController.placeUnbookmark);
router.put("/reviews/bookmark/:reviewPostId", authMiddleware, bookmarkController.reviewBookmark);
router.put("/reviews/unbookmark/:reviewPostId", authMiddleware, bookmarkController.reviewUnbookmark);

module.exports = router;