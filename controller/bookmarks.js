const recruitPost = require("../schemas/recruitPost");
const placePost = require("../schemas/placePost");
const reviewPost = require("../schemas/reviewPost");
const Bookmark = require("../schemas/bookmark");
const User = require("../schemas/user");

// 모집 게시글 북마크 표시
async function recruitBookmark(req, res) {
    try {
        const { recruitPostId } = req.params;
        const { nickname } = res.locals.user;
        const bookmark = await Bookmark.findOne({ recruitPostId: Number(recruitPostId), nickname });
        const existRecruitPost = await recruitPost.findOne({ recruitPostId: Number(recruitPostId) });
        console.log(bookmark)

        if (!existRecruitPost) {
            return res.status(400).send({
                result: "false",
                message: "해당 게시글이 없습니다."
            })
        }

        if (!bookmark) {
            await Bookmark.create({ recruitPostId: Number(recruitPostId), nickname, bookmarkCheck: true})
            return res.status(200).send({
                result: "true",
                message: "북마크가 표시되었습니다."
            })
        }

        if (bookmark.bookmarkCheck === false) {
            await Bookmark.updateOne({ recruitPostId, nickname }, { $set: { bookmarkCheck: true }});
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
async function recruitUnbookmark(req, res) {
    try {
        const { recruitPostId } = req.params;
        const { nickname } = res.locals.user;
        const bookmarks = await Bookmark.findOne({ recruitPostId: Number(recruitPostId), nickname });
        console.log(bookmarks)

        if (bookmarks.bookmarkCheck === true) {
            await Bookmark.updateOne({ recruitPostId, nickname }, { $set: { bookmarkCheck: false }});
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

// 장소추천 게시글 북마크 표시
async function placeBookmark(req, res) {
    try {
        const { placePostId } = req.params;
        const { nickname } = res.locals.user;
        const bookmark = await Bookmark.findOne({ placePostId: Number(placePostId), nickname });
        const existPlacePost = await placePost.findOne({ placePostId: Number(placePostId) });
        console.log(bookmark)

        if (!existPlacePost) {
            return res.status(400).send({
                result: "false",
                message: "해당 게시글이 없습니다."
            })
        }

        if (!bookmark) {
            await Bookmark.create({ placePostId: Number(placePostId), nickname, bookmarkCheck: true})
            return res.status(200).send({
                result: "true",
                message: "북마크가 표시되었습니다."
            })
        }

        if (bookmark.bookmarkCheck === false) {
            await Bookmark.updateOne({ placePostId, nickname }, { $set: { bookmarkCheck: true }});
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

// 장소추천 게시글 북마크 취소
async function placeUnbookmark(req, res) {
    try {
        const { placePostId } = req.params;
        const { nickname } = res.locals.user;
        const bookmark = await Bookmark.findOne({ placePostId: Number(placePostId), nickname });
        console.log(bookmark)

        if (bookmark.bookmarkCheck === true) {
            await Bookmark.updateOne({ placePostId, nickname }, { $set: { bookmarkCheck: false }});
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

// 육아용품 리뷰 게시글 북마크 표시
async function reviewBookmark(req, res) {
    try {
        const { reviewPostId } = req.params;
        const { nickname } = res.locals.user;
        const bookmark = await Bookmark.findOne({ reviewPostId: Number(reviewPostId), nickname });
        const existReviewPost = await reviewPost.findOne({ reviewPostId: Number(reviewPostId) });
        console.log(bookmark)

        if (!existReviewPost) {
            return res.status(400).send({
                result: "false",
                message: "해당 게시글이 없습니다."
            })
        }

        if (!bookmark) {
            await Bookmark.create({ reviewPostId: Number(reviewPostId), nickname, bookmarkCheck: true})
            return res.status(200).send({
                result: "true",
                message: "북마크가 표시되었습니다."
            })
        }

        if (bookmark.bookmarkCheck === false) {
            await Bookmark.updateOne({ reviewPostId, nickname }, { $set: { bookmarkCheck: true }});
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

// 육아용품 리뷰 게시글 북마크 취소
async function reviewUnbookmark(req, res) {
    try {
        const { reviewPostId } = req.params;
        const { nickname } = res.locals.user;
        const bookmark = await Bookmark.findOne({ reviewPostId: Number(reviewPostId), nickname });
        console.log(bookmark)

        if (bookmark.bookmarkCheck === true) {
            await Bookmark.updateOne({ reviewPostId, nickname }, { $set: { bookmarkCheck: false }});
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

module.exports = {
    recruitBookmark,
    recruitUnbookmark,
    placeBookmark,
    placeUnbookmark,
    reviewBookmark,
    reviewUnbookmark
  };