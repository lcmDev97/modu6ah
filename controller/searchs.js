require("dotenv").config();
const recruitPost = require("../schemas/recruitPost");
const placePost = require("../schemas/placePost");
const reviewPost = require("../schemas/reviewPost");
const logger = require("../logger");

// 전체 카테고리에서 검색
async function searchAll(req, res) {

    try{
        options = [
            { title: new RegExp(req.query.keyword) },
            { content: new RegExp(req.query.keyword) },
        ]

        const { authorization } = req.headers;
        if(authorization){
            // const nickname = "test1"
            const { nickname } = res.locals.user;
            console.log("nickname정보",nickname)
            console.log('req.locals.user정보',res.locals.user)
            let resultsInRecruit = await recruitPost.find({ $or: options }).sort({recruitPostId:-1})
            let resultsInPlace = await placePost.find({ $or: options }).sort({placePostId:-1})
            let resultsInReview = await reviewPost.find({ $or: options }).sort({reviewPostId:-1})
            console.log("포문전 모집1개만",resultsInRecruit[0])
            for(let i = 0; i <resultsInRecruit.length ; i++ ){
                if( resultsInRecruit[i].bookmarkUsers.includes(nickname) ){
                    resultsInRecruit[i].bookmarkStatus = true
                }
                resultsInRecruit[i].bookmarkUsers = null
            }
            console.log("포문후 모집1개만",resultsInRecruit[0])
            for(let i = 0; i <resultsInPlace.length ; i++ ){
                if( resultsInPlace[i].bookmarkUsers.includes(nickname) ){
                    resultsInPlace[i].bookmarkStatus = true
                }
                resultsInPlace[i].bookmarkUsers = null
            }
            for(let i = 0; i <resultsInReview.length ; i++ ){
                if( resultsInReview[i].bookmarkUsers.includes(nickname) ){
                    resultsInReview[i].bookmarkStatus = true
                }
                resultsInReview[i].bookmarkUsers = null
            }
            return res.json({
                resultsInRecruit,
                resultsInPlace,
                resultsInReview,
            })
        }

        const resultsInRecruit = await recruitPost.find({ $or: options },{ bookmarkUsers : 0, bookmarkStatus : 0 }).sort({recruitPostId:-1})
        const resultsInPlace = await placePost.find({ $or: options },{ bookmarkUsers : 0, bookmarkStatus : 0 }).sort({placePostId:-1})
        const resultsInReview = await reviewPost.find({ $or: options },{ bookmarkUsers : 0, bookmarkStatus : 0 }).sort({reviewPostId:-1})

        return res.json({
            resultsInRecruit,
            resultsInPlace,
            resultsInReview,
        })
    }catch(err){
        logger.error("전체 검색 실패")
        return res.status(400).json({
            result : false,
            message : "전체 검색 실패"
        })
    }
};

// 모집게시글 카테고리에서 검색
async function searchRecruit(req, res) {
    try{
        if(!req.query.keyword){
            return res.json({
                result : false,
                message : "검색할 키워드를 입력해 주세요"
            })
        }
    
        options = [
            { title: new RegExp(req.query.keyword) },
            { content: new RegExp(req.query.keyword) },
        ]
        const resultsInRecruit = await recruitPost.find({ $or: options },{ bookmarkUsers : 0, bookmarkStatus : 0 }).sort({recruitPostId:-1})
        return res.json({
            resultsInRecruit,
        })
    }catch(err){
        logger.error("모집게시글 검색 실패")
        return res.json({
            result : false,
            message : "모집게시글 검색 실패"
        })
    }
};

// 장소추천게시글 카테고리에서 검색
async function searchPlace(req, res) {

    try{
        if(!req.query.keyword){
            return res.json({
                result : false,
                message : "검색할 키워드를 입력해 주세요"
            })
        }
    
        options = [
            { title: new RegExp(req.query.keyword) },
            { content: new RegExp(req.query.keyword) },
        ]
        const resultsInRecruit = await recruitPost.find({ $or: options },{ bookmarkUsers : 0, bookmarkStatus : 0 }).sort({placePostId:-1})
        return res.json({
            resultsInRecruit,
        })
    }catch(err){
        logger.error("장소 추천 게시글 검색 실패")
        return res.json({
            result : false,
            message : "장소 추천 게시글 검색 실패"
        })
    }
};

// 육아템리뷰 게시글 카테고리에서 검색
async function searchReview(req, res) {
    try{
        if(!req.query.keyword){
            return res.json({
                result : false,
                message : "검색할 키워드를 입력해 주세요"
            })
        }
    
        options = [
            { title: new RegExp(req.query.keyword) },
            { content: new RegExp(req.query.keyword) },
        ]
        const resultsInReview = await reviewPost.find({ $or: options },{ bookmarkUsers : 0, bookmarkStatus : 0 }).sort({reviewPostId:-1})
        return res.json({
            resultsInReview,
        })
    }catch(err){
        logger.error("육아템 리뷰 게시글 검색 실패")
        return res.json({
            result : false,
            message : "육아템 리뷰 게시글 검색 실패"
        })
    }
};

module.exports = {
    searchAll,
    searchRecruit,
    searchPlace,
    searchReview,
  };