require("dotenv").config();
const { server } = require("./socket");
const PORT = process.env.PORT;
const logger = require("./logger");

server.listen(PORT, () => {
    logger.info(`${PORT}번 포트로 서버가 열렸습니다.`);
});