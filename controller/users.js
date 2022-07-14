require("dotenv").config();
const User = require("../schemas/user");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const Bcrypt = require("bcrypt");
const passport = require("passport");
const SALT_NUM = process.env.SALT_NUM;
const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

// 회원가입 조건
const signUpSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .label("이메일 형식이 유효하지 않습니다."),
    nickname: Joi.string()
        .pattern(new RegExp("^[0-9A-Za-z가-힣]{2,12}$"))
        .required()
        .label("닉네임은 한글, 영문 대/소문자, 숫자, 2~12자 이여야 합니다."),
    password: Joi.string()
        .pattern(new RegExp("^[0-9A-Za-z]{4,16}$"))
        .required()
        .label("비밀번호는 한글, 영문 대/소문자 4~16자 이여야 합니다."),
    passwordCheck: Joi.string(),
});

async function signup(req, res, next) {
    try {
        const { email, nickname, password, passwordCheck } =
            await signUpSchema.validateAsync(req.body);
        const existUser = await User.findOne({ email });
        // console.log('existUser정보',existUser)
        //이미 이메일이 존재하는 경우
        if (existUser) {
            return res.status(400).json({
                message: "사용중인 이메일입니다.",
                result: false,
            });
        }
        const existnickname = await User.findOne({ nickname });
        //이미 닉네임이 존재하는 경우
        if (existnickname) {
            return res.status(400).json({
                message: "사용중인 닉네임입니다.",
                result: false,
            });
        }
        // 비밀번호와 비밀번호 확인란이 일치하지 않을 경우
        if (password !== passwordCheck) {
            return res.status(400).json({
                message: "비밀번호 확인란이 일치하지 않습니다.",
                result: false,
            });
        }

        const salt = await Bcrypt.genSalt(Number(SALT_NUM));
        const hashPassword = await Bcrypt.hash(password, salt); // 비밀번호 암호화
        const user = new User({
            email,
            nickname,
            password: hashPassword,
            myComment: "",
            profileUrl: "https://changminbucket.s3.ap-northeast-2.amazonaws.com/basicProfile.png",
            refreshToken: "",
            snsId: "",
            provider: "local",
        });
        // console.log("db에 저장될 user정보입니다.",user)
        await user.save();
        return res.status(201).send({
            message: "회원가입에 성공하였습니다.",
            result: true,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.details[0].context.label,
            result: false,
        });
    }
}

async function signin(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                result: false,
                message: "이메일 또는 패스워드가 틀렸습니다.",
            });
        }
        const nickname = user.nickname;
        const profileUrl = user.profileUrl;
        const bcpassword = await Bcrypt.compare(password, user.password);
        if (!bcpassword) {
            return res.status(400).json({
                message: "이메일 또는 패스워드가 틀렸습니다.",
                result: false,
            });
        }
        const accessToken = jwt.sign({ nickname: user.nickname }, SECRET_KEY, {
            expiresIn: "4h",
        });
        const refreshToken = jwt.sign({}, REFRESH_SECRET_KEY, {
            expiresIn: "14d",
        });
        console.log("accessToken이 생성되었습니다.", accessToken);
        console.log("refreshToken이 생성되었습니다.", refreshToken);
        await User.updateOne(
            { nickname: user.nickname },
            { refreshToken: refreshToken }
        );
        return res.json({
            result: true,
            accessToken,
            nickname,
            profileUrl
        });
    } catch (err) {
        return res.status(400).json({
            message: err,
            result: false,
        });
    }
}

//   [passport-local 이용 함수]
// async function signup (req, res, next) {
// passport.authenticate('local', (authError, user, info) => {
//   if (authError) {
//     console.error(authError);
//     return next(authError);
//   }
//   if (!user) {
//     return res.send('user가 존재하지 않습니다.')    //기존 코드 return res.redirect(`/?loginError=${info.message}`);
//   }
//   return req.login(user, (loginError) => {
//     if (loginError) {
//       console.error(loginError);
//       return next(loginError);
//     }
//     return res.send('로컬로그인 완료되었습니다.')     // <= 원래 코드 return res.redirect('/');
//   });
// })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
// }

const KAKAO_OAUTH_TOKEN_API_URL = 'https://kauth.kakao.com/oauth/token';
const KAKAO_GRANT_TYPE = 'authorization_code';
const client_id = "	e9ef94fab6bfeb25509276a4582209b6";
const KAKAO_REDIRECT_URL = 'http://localhost:3000/api/users/kakao/callback';

  
  // router.post - '/kakao/member'
  function kakao_member(req, res) {
    try {
      console.log(req.body)
      const api_url = 'https://kapi.kakao.com/v2/user/me';
      const request = require('request');
      const access_token = req.body.access_token;
      // var header = 'Bearer ' + token; // Bearer 다음에 공백 추가
      const options = {
        url: api_url,
        headers: { Authorization: `Bearer ${access_token}` },
      };
      request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
          res.end(body);

          // console.log("받아오는 error",error);
          console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
          // console.log("받아오는 response",response);
          console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
          // console.log("받아오는 body값",body);
        } else {
          console.log('error');
          if (response != null) {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
          }
        }
      });
    } catch (err) {
      res.status(400).send('에러가 발생했습니다.');
      console.log('error =' + err);
    }
  }
  // post -'/kakao/parsing'
  async function kakao_parsing(req, res) {
    try {
    // console.log("kakao_parsing의 req정보다",req)
      const user_info = req.body;
      console.log("user_info정보다",user_info)
      const snsId = user_info.user_id;
      const userEmail = user_info.user_email;
      const nickname = user_info.user_name
      const exUser = await User.findOne({ $and: [{ snsId }, { provider: "kakao" }], });
      console.log('exUser: ', exUser);
      const accessToken = jwt.sign({ nickname }, process.env.SECRET_KEY, {
        expiresIn: '4h',
      });
      console.log('accessToken 정보임', accessToken);
      // const refresh_token = jwt.sign({}, process.env.REFRESH_SECRET_KEY, {
        //   expiresIn: '14d',
        // });
        
        // 만약 디비에 user의 email이 없다면,
        

        if (!exUser) {
          console.log('여기1111')
        const newUser = new User({ 
          email : userEmail, 
          nickname : nickname + Math.floor(Math.random() * 10000000),
          password : process.env.KAKAO_BASIC_PASSWORD,
          myComment : "",
          profileUrl: "https://changminbucket.s3.ap-northeast-2.amazonaws.com/basicProfile.png",
          refreshToken : "",
          snsId : snsId,
          provider : "kakao",
        });
        console.log("newUser정보임",newUser)
        // 저장하기
        newUser.save();
        console.log('여기222222222')
        // await newUser.update({ refresh_token }, { where: { userEmail } });
        return res.json({
          accessToken,
          nickname,
          profileUrl : "https://changminbucket.s3.ap-northeast-2.amazonaws.com/basicProfile.png",
        })
      }
        // 다른 경우라면,
        // 기존에서 리프레시 토큰만 대체하기
        // await exUser.update({ refresh_token }, { where: { userEmail } });
        const profileUrl = exUser.profileUrl
        return res.json({
          accessToken,
          nickname,
          profileUrl
        })
      
    } catch (error) {
      res.status(400).send('에러가 발생했습니다.');
      console.log('error =' + error);
    }
  }




module.exports = {
    signup,
    signin,
    kakao_member,
    kakao_parsing
};