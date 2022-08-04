require("dotenv").config();
const app = require("../app");
const request = require("supertest");
accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6InRlc3QyIiwiaWF0IjoxNjU4NzcxMTM0LCJleHAiOjE2NTg3ODU1MzR9.VKCWiQzxWApHkF9bCoR1zQMG-OMdQEadwONcy6oVldM'

jest.setTimeout(10000);

describe("장소추천 게시글 CRUD", () => {

    test("post /api/places", (done) => {
        const title = "테스트"
        const content = "테스트"
        const region = "테스트"
        const location = "테스트"
        const imageUrl = []
        const star = "테스트"
        request(app)
        .post(`/api/places`)
        .set('Authorization', `Bearer ${accessToken}` )
        .send({ title, content, region, location, imageUrl, star })
        .expect(200, done);
    })

    test("get /api/places 전체조회", (done) => {
        request(app)
        .get(`/api/places`)
        .expect(200, done);
    })

    test("get /api/places/:placePostId 상세조회", (done) => {
        request(app)
        .get(`/api/places/2`)
        .expect(200, done);
    })

    test("put /api/places/:placePostId", (done) => {
        const title = "테스트(수정)"
        const content = "테스트"
        const region = "테스트"
        const location = "테스트(수정)"
        const imageUrl = []
        const star = "테스트"
        request(app)
        .put(`/api/places/3`)
        .set('Authorization', `Bearer ${accessToken}` )
        .send({ title, content, region, location, imageUrl, star })
        .expect(200, done);
    })

    test("delete /api/places/:placePostId", (done) => {
        request(app)
        .delete(`/api/places/5`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200, done);
    })

})