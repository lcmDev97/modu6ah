const express = require("express");
const router = express.Router();
const bookmarkController = require("../controller/bookmarks");
const authMiddleware = require("../middlewares/authmiddleware");

router.put("/recruits/bookmark/:recruitPostId", authMiddleware, bookmarkController.bookmark);
router.put("/recruits/unbookmark/:recruitPostId", authMiddleware, bookmarkController.unbookmark);

module.exports = router;