const express = require("express");
const router = express.Router();
const bookmarkController = require("../controller/bookmarks");
const authMiddleware = require("../middlewares/authmiddleware");

