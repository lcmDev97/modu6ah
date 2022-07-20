const recruitPost = require("../schemas/recruitPost");
const placePost = require("../schemas/placePost");
const reviewPost = require("../schemas/reviewPost");
const User = require("../schemas/user");
const recruitComment = require("../schemas/recruitComment");
const placeComment = require("../schemas/placeComment");
const reviewComment = require("../schemas/reviewComment");
const RecruitBookmark = require("../schemas/recruitBookmark");
const PlaceBookmark = require("../schemas/placeBookmark");
const ReviewBookmark = require("../schemas/reviewBookmark");
const profileMiddleware = require('../middlewares/profileMulter');

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
        const recruitBookmarkList = await RecruitBookmark.find({ nickname }).sort({markedAt:-1})
        for(let i = 0; i <recruitBookmarkList.length ; i++ ){
            recruitBookmarkList[i].bookmarkStatus = true
            recruitBookmarkList[i].bookmarkUsers = null
        }
        const placeBookmarkList = await PlaceBookmark.find({ nickname }).sort({markedAt:-1})
        for(let i = 0; i <placeBookmarkList.length ; i++ ){
            placeBookmarkList[i].bookmarkStatus = true
            placeBookmarkList[i].bookmarkUsers = null
        }
        const reviewBookmarkList = await ReviewBookmark.find({ nickname }).sort({markedAt:-1})
        for(let i = 0; i <reviewBookmarkList.length ; i++ ){
            reviewBookmarkList[i].bookmarkStatus = true
            reviewBookmarkList[i].bookmarkUsers = null
        }

        return res.send({ 
            result : true,
            recruitBookmarkList,
            placeBookmarkList,
            reviewBookmarkList,

        });

    } catch (err) {
        res.status(400).send({
            result: "false",
            message: err
        });
    }
};

// 프로필 수정
async function profileUpdate(req, res) {
    try {
        const { nickname } = res.locals.user;
        const { myComment } = req.body;
        const findUser = await User.findOne({ nickname });
        let profileUrl;
        let newProfileUrl = req.file;

        // req.file이 있을 때
        if (newProfileUrl) {
            profileMiddleware.profileDelete(findUser.profileUrl)
            await User.updateMany({ nickname }, { $set: { profileUrl: newProfileUrl.transforms[0].location, myComment }});
            await recruitPost.updateMany({ nickname }, { $set: { profileUrl: newProfileUrl.transforms[0].location }});
            await placePost.updateMany({ nickname }, { $set: { profileUrl: newProfileUrl.transforms[0].location }});
            await reviewPost.updateMany({ nickname }, { $set: { profileUrl: newProfileUrl.transforms[0].location }});
            await recruitComment.updateMany({ nickname }, { $set: { profileUrl: newProfileUrl.transforms[0].location }});
            await placeComment.updateMany({ nickname }, { $set: { profileUrl: newProfileUrl.transforms[0].location }});
            await reviewComment.updateMany({ nickname }, { $set: { profileUrl: newProfileUrl.transforms[0].location}});
            res.status(200).send({ result: "true", message: "프로필 수정이 완료되었습니다." });
        // req.file이 없을 때
        } else {
            let profileUrl = findUser.profileUrl;
            res.status(200).send({ profileUrl })
        }
        
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