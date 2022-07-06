const reviewPost = require("../schemas/reviewPost");
const reviewComment = require("../schemas/reviewComment");
const User = require("../schemas/user");

// 육아용품 리뷰 게시글 작성
async function reviewPosts(req, res) {
  try {
      // 불러올 정보 및 받아올 정보
      const { nickname } = res.locals.user;
      const { title, content, imageUrl, url, productType } = req.body;

      // 게시글 작성
      const createdPosts = await reviewPost.create({
          nickname,
          title,
          content,
          imageUrl,
          url,
          productType
      });
      console.log(createdPosts)

      res.status(200).send({
          result: "true",
          message: "게시글이 성공적으로 등록되었습니다."
      });
  } catch (err) {
      res.status(400).send({
          result: "false",
          message: "게시글 작성 실패"
      });
  }
};

// 육아용품 리뷰 게시글 전체조회
async function reviewAllGet(req, res) {
    try {
        const reviewPosts = await reviewPost.find({}, { updatedAt: 0, _id: 0 });
        res.status(200).send({reviewPosts: reviewPosts});
    } catch (err) {
        res.status(400).send({
            result: "false",
            message: "게시글 전체조회 실패"
        });
    }
};

// 육아용품 리뷰 게시글 상세조회
async function reviewGet(req, res) {
    try {
        const { reviewPostId } = req.params;
        const [reviewDetails] = await reviewPost.find({ reviewPostId: Number(reviewPostId) }, { _id: 0 });
        const reviewComments = await reviewComment.find({ reviewPostId: Number(reviewPostId) }, { _id: 0 }).sort({ reviewCommentId: -1 });
        if (!reviewDetails) {
            return res.status(400).send({ result: "false", message: "게시글이 없습니다."});
        } else {
            return res.status(200).send({ reviewDetails, reviewComments });
        }
    } catch (err) {
        res.status(400).send({
            result: "false",
            message: "게시글 상세조회 실패"
        });
    }
};

// 육아용품 리뷰 게시글 수정
async function reviewUpdate(req, res) {
    try {
        const { reviewPostId } = req.params;
        const { title, content, imageUrl, url, productType } = req.body;
        const { nickname } = res.locals.user;
        const reviewPosts = await reviewPost.findOne({ reviewPostId: Number(reviewPostId) });

        if (nickname === reviewPosts.nickname) {
            await reviewPost.updateOne({ reviewPostId }, { $set: { title, content, imageUrl, url, productType }});
            res.status(200).send({
                result: "true",
                message: "게시글이 성공적으로 수정되었습니다."
            });
        } else {
            res.status(400).send({
                result: "false",
                message: "게시글 수정 권한 없음"
            });
        }
    } catch (err) {
        res.status(400).send({
            result: "false",
            message: "게시글 수정 실패"
        });
    }
};

// 육아용품 리뷰 게시글 삭제(육아용품 리뷰 댓글도 같이 삭제)
async function reviewDelete(req, res) {
    try {
        const { reviewPostId } = req.params;
        const { nickname } = res.locals.user;
        const reviewPosts = await reviewPost.findOne({ reviewPostId: Number(reviewPostId) })

        if (nickname === reviewPosts.nickname) {
            await reviewPost.deleteOne({ reviewPostId });
            await reviewComment.deleteMany({ reviewPostId });

            res.status(200).send({
                result: "true",
                message: "게시글이 성공적으로 삭제되었습니다."
            });
        } else {
            res.status(400).send({
                result: "false",
                message: "게시글 삭제 권한 없음"
            });
        }
    } catch (err) {
        res.status(400).send({
            result: "false",
            message: "게시글 삭제 실패"
        });
    }
};

// 육아용품 리뷰 게시글 북마크 표시/해제
async function reviewBookmark(req, res) {
    try {
        const { reviewPostId } = req.params;
        const { nickname } = res.locals.user;
        const bookmarkPost = await reviewPost.findOne({ reviewPostId: Number(reviewPostId) });
        const user = await User.findOne({ nickname });
        console.log(bookmarkPost)
        if (!bookmarkPost.bookmarkUsers.includes(nickname)) {
            await bookmarkPost.updateOne({ $push: { bookmarkUsers: nickname }});
            await user.updateOne({ $push: { bookmarkList: reviewPostId }})
            res.status(200).send({
                result: "true",
                message: "북마크가 표시되었습니다."
            });
        } else {
            await bookmarkPost.updateOne({ $pull: { bookmarkUsers: nickname }});
            await user.updateOne({ $pull: { bookmarkList: reviewPostId }})
            res.status(200).send({
                result: "true",
                message: "북마크가 해제되었습니다."
            });
        }
    } catch (err) {
        res.status(400).send({
            result: "false",
            message: "게시글 북마크 표시/해제 실패"
        });
    }
}

module.exports = {
    reviewPosts,
    reviewAllGet,
    reviewGet,
    reviewUpdate,
    reviewDelete,
    reviewBookmark,
  };