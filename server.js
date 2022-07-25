require("dotenv").config();
const { server } = require("./socket");
const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`${PORT}번 포트로 서버가 열렸습니다.`);
});