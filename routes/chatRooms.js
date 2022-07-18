const express = require("express");
const router = express.Router();
const chatRoomsController = require("../controller/chatRooms");
const authMiddleware = require("../middlewares/authmiddleware");

// 채팅방 생성
router.post("/chats/rooms/:recruitPostId", authMiddleware, chatRoomsController.chatRooms);

// 유저의 채팅방 전체조회
router.get("/chats/rooms", authMiddleware, chatRoomsController.chatRoomsAllGet);
// 채팅방 조건부 삭제 
router.put("/chats/rooms/:roomId", authMiddleware, chatRoomsController.chatRoomsPut);
// 채팅방 삭제 
router.delete("/chats/rooms/:roomId", authMiddleware, chatRoomsController.chatRoomsDelete);

module.exports = router;