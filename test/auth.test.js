require("dotenv").config();
const app = require("../app");
const request = require("supertest");

jest.setTimeout(10000);

// 회원가입
describe("회원가입", () => {
    test("post /api/users/signup", (done) => {
        const email = "test@email.com"
        const nickname = "test"
        const password = "test"
        const passwordCheck = "test"
        request(app)
        .post(`/api/users/signup`)
        .send({ email, nickname, password, passwordCheck})
        .expect(201, done);
    })
});

// 로그인
describe("로그인", () => {
    test("post /api/users/signin", (done) => {
        const email = "test@email.com"
        const password = "test"
        request(app)
        .post(`/api/users/signin`)
        .send({ email, password })
        .expect(200, done);
    })
});