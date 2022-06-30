const express = require("express");
const router = express.Router();
const chatRoomsController = require("../controller/chatRooms");
const authMiddleware = require("../middlewares/authmiddleware");

// 채팅방 생성(authMiddleware는 추후 추가 예정)
router.post("/chats/rooms/:postId", authMiddleware, chatRoomsController.chatRooms);

module.exports = router;