require("dotenv").config();
const app = require("../app");
const request = require("supertest");
accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6InRlc3QyIiwiaWF0IjoxNjU4NzcxMTM0LCJleHAiOjE2NTg3ODU1MzR9.VKCWiQzxWApHkF9bCoR1zQMG-OMdQEadwONcy6oVldM'

jest.setTimeout(10000);

describe("육아용품 리뷰 게시글 CRUD", () => {

    test("post /api/reviews", (done) => {
        const title = "테스트"
        const content = "테스트"
        const imageUrl = []
        const url = "테스트"
        const productType = "테스트"
        request(app)
        .post(`/api/reviews`)
        .set('Authorization', `Bearer ${accessToken}` )
        .send({ title, content, imageUrl, url, productType })
        .expect(200, done);
    })

    test("get /api/reviews 전체조회", (done) => {
        request(app)
        .get(`/api/reviews`)
        .expect(200, done);
    })

    test("get /api/reviews/:reviewPostId 상세조회", (done) => {
        request(app)
        .get(`/api/reviews/2`)
        .expect(200, done);
    })

    test("put /api/reviews/:reviewPostId", (done) => {
        const title = "테스트(수정)"
        const content = "테스트"
        const imageUrl = []
        const url = "테스트"
        const productType = "테스트(수정)"
        request(app)
        .put(`/api/reviews/3`)
        .set('Authorization', `Bearer ${accessToken}` )
        .send({ title, content, imageUrl, url, productType })
        .expect(200, done);
    })

    test("delete /api/reviews/:reviewPostId", (done) => {
        request(app)
        .delete(`/api/reviews/5`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200, done);
    })

})