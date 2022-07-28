require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

module.exports = (req, res, next) => {
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
  console.log("authorization정보",authorization)

  try {
      const { nickname } = jwt.verify(authToken, SECRET_KEY);
      User.findOne({ nickname }).then((user) => {
        console.log("user정보",user)
        res.locals.user = user;
        next();
      });
  } catch (err) {
    res.status(401).send({
      result : false,
      message : "로그인후 사용해 주세요",
    });
  }
};
//  유저정보에 토큰도 같이
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return error.message;
  }
}
function verifyrefeshToken(refreshtoken) {
  try {
    return jwt.verify(refreshtoken, REFRESH_SECRET_KEY);
  } catch (error) {
    return error.message;
  }
}
