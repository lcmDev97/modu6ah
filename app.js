// 관련 모듈
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./database/database.js");
const morgan = require("morgan");
const helmet = require("helmet");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");
const logger = require("./logger");
connect();

// 라우터
const recruitPostsRouter = require("./routes/recruitPosts");
const recruitCommentsRouter = require("./routes/recruitComments");
const placePostsRouter = require("./routes/placePosts");
const placeCommentsRouter = require("./routes/placeComments");
const reviewPostsRouter = require("./routes/reviewPosts");
const reviewCommentsRouter = require("./routes/reviewComments");
const mypagesRouter = require("./routes/mypages");
const chatRoomsRouter = require("./routes/chatRooms");
const chatMessagesRouter = require("./routes/chatMessages");
const usersRouter = require("./routes/users");
const mainRouter = require("./routes/mains");
const searchRouter = require("./routes/searchs");
const schedule = require("./routes/schedule");

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "https://www.modu6ah.com",
        "https://modu6ah.com",
    ],
    credentials: true,
};

// 미들웨어
app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    })
);
app.use("/api/users", express.urlencoded({ extended: false }), [usersRouter]);
app.use("/api/recruits", express.urlencoded({ extended: false }), [recruitPostsRouter, recruitCommentsRouter]);
app.use("/api/places", express.urlencoded({ extended: false }), [placePostsRouter, placeCommentsRouter]);
app.use("/api/reviews", express.urlencoded({ extended: false }), [reviewPostsRouter, reviewCommentsRouter]);
app.use("/api/chats", express.urlencoded({ extended: false }), [chatRoomsRouter, chatMessagesRouter]);
app.use("/api/mypage", express.urlencoded({ extended: false }), [mypagesRouter]);
app.use("/api/main", express.urlencoded({ extended: false }), [mainRouter]);
app.use("/api/search", express.urlencoded({ extended: false }), [searchRouter]);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile)); // 스웨거 파일

app.get("/", (req, res) => {
    res.send("redirect 테스트하기위한 루트 페이지입니다.(테스트)");
});

// 없는 url로 요청한 경우
app.use((req, res, next) => {
    logger.error("존재하지 않는 url주소 입니다.");
    res.status(404).send("존재하지 않는 url주소 입니다.");
});

// 서버 에러 핸들링
app.use((error, req, res, next) => {
    logger.error(error);
    res.status(500).send("서버에 에러가 발생하였습니다.");
});

schedule.schedule_job();

module.exports = app;
