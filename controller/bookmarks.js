const recruitPost = require("../schemas/recruitPost");
const recruitBookmark = require("../schemas/bookmark");
const User = require("../schemas/user");

// 모집 게시글 북마크 표시
async function bookmark(req, res) {
    try {
        const { recruitPostId } = req.params;
        const { nickname } = res.locals.user;
        const bookmark = await recruitBookmark.findOne({ recruitPostId: Number(recruitPostId), nickname });
        const existRecruitPost = await recruitPost.findOne({ recruitPostId: Number(recruitPostId) });
        console.log(bookmark)

        if (!existRecruitPost) {
            return res.status(400).send({
                result: "false",
                message: "해당 게시글이 없습니다."
            })
        }

        if (!bookmark) {
            const bookmarkFirst = await recruitBookmark.create({ recruitPostId: Number(recruitPostId), nickname, bookmarkCheck: true})
            return res.status(200).send({
                result: "true",
                message: "북마크가 표시되었습니다."
            })
        }

        if (bookmark.bookmarkCheck === false) {
            await bookmark.updateOne({ $set: { bookmarkCheck: true }});
            return res.status(200).send({
                    result: "true",
                    message: "북마크가 표시되었습니다."
                });
        } else {
            return res.status(400).send({
                    result: "true",
                    message: "이미 북마크가 표시되었습니다."
                });
        }
    } catch (err) {
        res.status(400).send({
            result: "false",
            message: "북마크 오류"
        });
    }
}

// 모집 게시글 북마크 취소
async function unbookmark(req, res) {
    try {
        const { recruitPostId } = req.params;
        const { nickname } = res.locals.user;
        const bookmark = await recruitBookmark.findOne({ recruitPostId: Number(recruitPostId), nickname });
        console.log(bookmark)

        if (bookmark.bookmarkCheck === true) {
            await bookmark.updateOne({ $set: { bookmarkCheck: false }});
            return res.status(200).send({
                    result: "true",
                    message: "북마크가 취소되었습니다."
                });
        } else {
            return res.status(400).send({
                    result: "true",
                    message: "이미 북마크가 취소되었습니다."
                });
        }
    } catch (err) {
        res.status(400).send({
            result: "false",
            message: "북마크 오류"
        });
    }
}

// module.exports = {
//     bookmark,
//     unbookmark
//   };