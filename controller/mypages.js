const recruitPost = require("../schemas/recruitPost");
const placePost = require("../schemas/placePost");
const reviewPost = require("../schemas/reviewPost");
const User = require("../schemas/user");
const recruitComment = require("../schemas/recruitComment");
const placeComment = require("../schemas/placeComment");
const reviewComment = require("../schemas/reviewComment");

// 프로필 조회 - 로그인한 사람/안한 사람
async function profileGet(req, res) {
    try {
        const { nickname } = req.params
        const mypageGet = await User.findOne({ nickname }, { _id: 0, email: 1, nickname: 1, profileUrl: 1, myComment: 1 });
        if(!mypageGet){
            return res.status(400).send({
                result: "false",
                message: "존재하지 않는 유저입니다."
            });
        }
        return res.status(200).send({ mypageGet });
    } catch (err) {
        res.status(400).send({
            result: "false",
            message: "프로필 조회 실패"
        });
    }
};

// 북마크 게시글 조회
async function myBookmark(req, res) {
    try {
        const { nickname } = res.locals.user;
        const bookmarkList1 = await recruitPost.find({ bookmarkUsers: nickname }, { _id: 0, bookmarkUsers: 0 }); // 모집 게시글
        const bookmarkList2 = await placePost.find({ bookmarkUsers: nickname }, { _id: 0, bookmarkUsers: 0 }); // 장소 추천
        const bookmarkList3 = await reviewPost.find({ bookmarkUsers: nickname }, { _id: 0, bookmarkUsers: 0 }); // 육아용품 리뷰
        
        return res.send({ 
            result : true,
            bookmarkList1,
            bookmarkList2,
            bookmarkList3,
        });

    } catch (err) {
        res.status(400).send({
            result: "false",
            message: "북마크 게시글 조회 실패"
        });
    }
};

// 프로필 수정
async function profileUpdate(req, res) {
    try {
        const { nickname } = res.locals.user;
        const { profileUrl, myComment } = req.body;
        await User.updateMany({ nickname }, { $set: { profileUrl, myComment }});
        await recruitPost.updateMany({ nickname }, { $set: { profileUrl }});
        await placePost.updateMany({ nickname }, { $set: { profileUrl}});
        await reviewPost.updateMany({ nickname }, { $set: { profileUrl }});
        await recruitComment.updateMany({ nickname }, { $set: { profileUrl }});
        await placeComment.updateMany({ nickname }, { $set: { profileUrl }});
        await reviewComment.updateMany({ nickname }, { $set: { profileUrl}});
        res.status(200).send({ result: "true", message: "프로필 수정이 완료되었습니다." });
    } catch (err) {
        res.status(400).send({
            result: "false",
            message: "프로필 수정 실패"
        });
    }
};


module.exports = {
    profileGet,
    myBookmark,
    profileUpdate
  };