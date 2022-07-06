const recruitPost = require("../schemas/recruitPost");
const placePost = require("../schemas/placePost");
const reviewPost = require("../schemas/reviewPost");

// 메인 페이지 조회
async function mainPostGet(req, res) {
    const placeMain = await placePost.find({}).sort({ star: -1,  createdAt: -1 }.limit(2));
    
    // console.log(placeMain);

    res.status(200).send({placePosts: placeMain});
};


module.exports = {
    mainPostGet
};