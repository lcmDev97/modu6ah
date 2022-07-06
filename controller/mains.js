const recruitPost = require("../schemas/recruitPost");
const placePost = require("../schemas/placePost");
const reviewPost = require("../schemas/reviewPost");

// 메인 페이지 조회
async function mainPostGet(req, res) {

    //모집게시글
    const recruitPosts = await recruitPost.find({ status: false }).limit(8).sort({ createdAt: -1 })
    let remainNum;
    if( recruitPosts.length !==8 ){
        remainNum = 8 - recruitPosts.length
    }
    console.log(remainNum)
    const truePosts = await recruitPost.find({ status: true }).limit(remainNum).sort({ createdAt: -1 })
    for(let i = 0 ; i < remainNum ; i++){
        recruitPosts.push(truePosts[i])
    }

    //장소추천게시글
    const placePosts = await placePost.find({}).sort({ star: -1,  createdAt: -1 }).limit(2);
    
    // 리뷰 조회
    const reviewPosts = await reviewPost.find().sort({createdAt:-1}).limit(2);
    

    return res.json({
        result:true,
        recruitPosts,
        placePosts, 
        reviewPosts
    })
};


module.exports = {
    mainPostGet
};