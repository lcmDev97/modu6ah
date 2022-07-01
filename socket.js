// 초기 세팅
const http = require('http');
const socketIo = require('socket.io');
const app = require('app');
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

// 소켓 연결
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    // 방 입장 이벤트 수신
    socket.on("joinRoom", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

})