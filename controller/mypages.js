const recruitPost = require("../schemas/recruitPost");
const placePost = require("../schemas/placePost");
const reviewPost = require("../schemas/reviewPost");
const Bookmark = require("../schemas/bookmark");
const User = require("../schemas/user");

// 프로필 조회
async function profileGet(req, res) {
    try {
        const { nickname } = res.locals.user;
        const mypageGet = await User.findOne({ nickname }, { _id: 0, email: 1, nickname: 1, profileUrl: 1, myComment: 1 });
        res.status(200).send({ mypageGet });
    } catch (err) {
        res.status(400).send({
            result: "false",
            message: "프로필 조회 실패"
        });
    }
};

// 북마크 게시글 조회 - 북마크한 게시글 번호를 찾아 recruitPost에서 찾음
async function myBookmark(req, res) {
    try {
        // 수정중
        const { nickname } = res.locals.user;
        const bookmarkList = await Bookmark.find({ nickname, bookmarkCheck: true });
        console.log(bookmarkList)

        // const bookmarkList1 = await recruitPost.find({ bookmarkUsers: nickname }, { _id: 0, bookmarkUsers: 0 }); // 모집 게시글
        // const bookmarkList2 = await placePost.find({ bookmarkUsers: nickname }, { _id: 0, bookmarkUsers: 0 }); // 장소 추천
        // const bookmarkList3 = await reviewPost.find({ bookmarkUsers: nickname }, { _id: 0, bookmarkUsers: 0 }); // 육아용품 리뷰
        // console.log(bookmarkList1, bookmarkList2, bookmarkList3);

        return res.send({ bookmarkList });

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
        const mypageUpdate = await User.updateOne({ nickname }, { $set: { profileUrl, myComment }});
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