const recruitPost = require("../schemas/recruitPost");
// const User = require("../schemas/user");

// 모집 게시글 작성
async function recruitPosts(req, res) {
  try {
      // 불러올 정보 및 받아올 정보
      // const { nickname } = res.locals.user;
      const { title, content, imageUrl, date, time, place } = req.body;
      let status = false;

      // 게시글 작성
      const createdPosts = await recruitPost.create({
          // nickname,
          title,
          content,
          imageUrl,
          date,
          time,
          place,
          status
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

// 모집 게시글 전체조회
async function recruitAllGet(req, res) {
    try {
        const recruitPosts = await recruitPost.find({}, { postId: 1, title: 1, content: 1, imageUrl: 1, createdAt: 1, _id: 0 });
        res.status(200).send({recruitPosts: recruitPosts});
    } catch (err) {
        res.status(400).send({
            result: "false",
            message: "게시글 전체조회 실패"
        });
    }
};

// 모집 게시글 상세조회 (recruitComment 만들어지면 추가로 send)
async function recruitGet(req, res) {
    try {
        const { postId } = req.params;
        // const { nickname } = res.locals.user;
        const [recruitDetails] = await recruitPost.find({ postId: Number(postId) }, { postId: 1, title: 1, content: 1, imageUrl: 1, createdAt: 1, _id: 0 });
        res.status(200).send( recruitDetails );
    } catch (err) {
        res.status(400).send({
            result: "false",
            message: "게시글 상세조회 실패"
        });
    }
};

// 모집 게시글 수정
async function recruitUpdate(req, res) {
    try {
        const { postId } = req.params;
        const { title, content, date, time, place, status } = req.body;
        // const { nickname } = res.locals.user;
        const [ recruitPosts ] = await recruitPost.findOne({ postId: Number(postId) })

        if (nickname === recruitPosts.nickname) {
            await recruitPost.updateOne({ postId }, { $set: { title, content, date, time, place, status }});
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

// 모집 게시글 삭제
async function recruitDelete(req, res) {
    try {
        const { postId } = req.params;
        // const { nickname } = res.locals.user;
        const [ recruitPosts ] = await recruitPost.findOne({ postId: Number(postId) })

        if (nickname === recruitPosts.nickname) {
            await recruitPost.deleteOne({ postId });
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

module.exports = {
    recruitPosts,
    recruitAllGet,
    recruitGet,
    recruitUpdate,
    recruitDelete
  };