require("dotenv").config();
const app = require("../app");
const request = require("supertest");
accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6InRlc3QyIiwiaWF0IjoxNjU4NzcxMTM0LCJleHAiOjE2NTg3ODU1MzR9.VKCWiQzxWApHkF9bCoR1zQMG-OMdQEadwONcy6oVldM'
// const baseData = require("./baseData");

jest.setTimeout(10000);

// function loginUser(auth) {
//     return function (done) {
//       request(app)
//         .post('/api/users/signin')
//         .send({
//           email: baseData.email,
//           password: baseData.password
//         })
//         .expect(200)
//         .end(onResponse);
  
//       function onResponse(err, res) {
//         auth.accessToken = res.body.accessToken;
//         return done();
//       }
//     };
//   }

describe("모집 게시글 CRUD", () => {
    // const auth = {};
    // beforeEach(loginUser(auth));

    test("post /api/recruits", (done) => {
        const title = "테스트"
        const content = "테스트"
        const date = "테스트"
        const time = "테스트"
        const place = "테스트"
        const age = "테스트"
        request(app)
        .post(`/api/recruits`)
        .set('Authorization', `Bearer ${accessToken}` )
        .send({ title, content, date, time, place, age })
        .expect(200, done);
    })

    test("get /api/recruits 전체조회", (done) => {
        request(app)
        .get(`/api/recruits`)
        .expect(200, done);
    })

    test("get /api/recruits/:recruitPostId 상세조회", (done) => {
        request(app)
        .get(`/api/recruits/7`)
        .expect(200, done);
    })

    test("put /api/recruits/:recruitPostId", (done) => {
        const title = "테스트(수정2)"
        const content = "테스트"
        const date = "테스트"
        const time = "테스트"
        const place = "테스트(수정2)"
        const age = "테스트"
        request(app)
        .put(`/api/recruits/1`)
        .set('Authorization', `Bearer ${accessToken}` )
        .send({ title, content, date, time, place, age })
        .expect(200, done);
    })

    test("delete /api/recruits/:recruitPostId", (done) => {
        request(app)
        .delete(`/api/recruits/13`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200, done);
    })

})