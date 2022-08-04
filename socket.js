// 초기 세팅
require("dotenv").config();
const app = require("./app");
const server = require("http").createServer(app);
const socketIO = require("socket.io");

// DB
const chatRoom = require("./schemas/chatRoom");
const chatMessage = require("./schemas/chatMessage");
const User = require("./schemas/user");

// 소켓
const io = socketIO(server, {
    cors: {
        origin: [
            "http://localhost:3000",
            "https://www.modu6ah.com",
            "https://modu6ah.com",
        ],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

// 연결 시작
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // join_room 이벤트 수신
    socket.on("join_room", (data) => {
        socket.join(data.roomId); // 해당 roomId 입장
        socket.emit("test", data);
        console.log(
            `User with ID: ${socket.id} joined room: ${data.roomId}, ${data.senderNick}`
        );
    });

    // send_message 이벤트 수신
    socket.on("send_message", async (data) => {
        const message = new chatMessage(data); // 받은 메시지 DB 저장
        console.log(message);
        message.save().then(() => {
            // 해당 roomId로 receive_message 이벤트 송신
            io.in(data.roomId).emit("receive_message", {
                ...data,
                id: message._id,
            });
            console.log("data: ", data);
            console.log("data.roomId: ", data.roomId);
            // notify 이벤트 송신(알림 메시지 전송)
            io.emit("notify", data);
            console.log(`${data.senderNick}님이 메시지를 보냈습니다.`);
        });
    });

    // back 이벤트 수신(채팅방 뒤로가기)
    socket.on("back", (data) => {
        socket.leave(data);
        console.log(`User with ID: ${socket.id} left room: ${data}`);
    });

    // 연결 중지
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

module.exports = { server };
