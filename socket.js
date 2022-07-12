// 초기 세팅
const socketIO = require('socket.io');

// DB
const chatRoom = require("./schemas/chatRoom");
const chatMessage = require("./schemas/chatMessage");

// 소켓
module.exports = (server) => {
    const io = socketIO(server, {
        path: '/socket.io',
        cors: {
            origin: '*',
            methods: ["GET", "POST"],
        }
    });

    // 연결 시작
    io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);

        // join_room 이벤트 수신(roomId 받음)
        socket.on("join_room", (data) => {
            socket.join(data); // 해당 roomId 입장
            socket.emit("test", data);
            console.log(`User with ID: ${socket.id} joined room: ${data}`);
      });

        // send_message 이벤트 수신(roomId, senderNick, message 받음)
        socket.on("send_message", async (data) => {
            // notify 이벤트 송신(알림 메시지 전송)
            io.emit("notify", data.message)
            console.log(`${data.senderNick}님이 메시지를 보냈습니다.`)
            const message = new chatMessage(data); // 받은 메시지 DB 저장
            console.log(message);
            message.save().then(() => {
            // 해당 roomId로 receive_message 이벤트 송신(해당 roomId에 접속한 클라이언트에게 메시지 전송)
            io.in(data.roomId).emit("receive_message", {...data, id: message._id });
            console.log('data: ', data);
            console.log('data.roomId: ', data.roomId);
            
            });
        });

        // back 이벤트 수신(채팅방 뒤로가기 클릭시 roomId 받음)
        socket.on("back", (data) => {
            socket.leave(data); // 해당 roomId에서 임시로 나감(완전 나가는 것x)
            console.log(`User with ID: ${socket.id} left room: ${data}`);
        });

        // 연결 중지
        socket.on("disconnect", () => {
            console.log("User Disconnected", socket.id);
        });
    });
};

        // 메시지 알림(메시지 전송시 senderNick,)
        // socket.on("notify", (data) => {
        //     socket.broadcast.to(data.roomId).emit(data)
        //     console.log(`${data.senderNick}님이 메시지를 보냈습니다.`);
        // })