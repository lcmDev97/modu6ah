require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    try {
    const { authorization } = req.headers;

    if (authorization == null) {
        res.status(401).send({
            errorMessage: "로그인이 필요합니다.",
        });
        return;
    }
    const [authType, authToken] = authorization.split(" ");

    if (!authToken || authType !== "Bearer") {
        res.status(401).send({
            errorMessage: "로그인이 필요한 기능입니다.",
        });
        return;
    }

        const { nickname } = jwt.verify(authToken, SECRET_KEY);
        User.findOne({ nickname }).then((user) => {
            // console.log("user정보", user);
            res.locals.user = user;
            next();
        });
    } catch (err) {
        res.status(401).send({
            result: false,
            message: "로그인후 사용해 주세요",
        });
    }
};
