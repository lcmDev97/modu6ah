require("dotenv").config();
const placePost = require("../schemas/placePost");
const placeComment = require("../schemas/placeComment");
const placeReComment = require("../schemas/placeReComment");
const moment = require("moment");
const User = require("../schemas/user");
const logger = require("../logger");

// 장소추천 댓글 등록
async function placeComments(req, res) {
    try {
        const { nickname, profileUrl } = res.locals.user;
        const { placePostId } = req.params;
        const { comment } = req.body;
        const createdAt = moment().add("9", "h").format("YYYY-MM-DD HH:mm");
        let status = false;

        // 게시글 찾기
        const findPost = await placePost.findOne({
            placePostId: Number(placePostId),
        });
        //  console.log(findPost);

        if (!findPost) {
            res.status(400).send({
                result: "false",
                message: "게시글 번호가 없습니다 ",
            });
        }

        const placeComments = await placeComment.create({
            nickname: nickname,
            profileUrl,
            placePostId: findPost.placePostId,
            comment: comment,
            createdAt: createdAt,
        });
        //  console.log(placeComments);

        res.status(200).send({
            result: "true",
            message: "댓글이 성공적으로 등록되었습니다.",
        });
    } catch (err) {
        logger.error("댓글 작성 실패");
        res.status(400).send({
            result: "false",
            message: "댓글 작성 실패",
        });
    }
}

// 장소추천 댓글 삭제
async function placeCommentsDelete(req, res) {
    try {
        const { placePostId, placeCommentId } = req.params;
        const { nickname } = res.locals.user;

        const placeComments = await placeComment.findOne({
            placePostId: placePostId,
            placeCommentId: placeCommentId,
        });

        if (!placeComments.placeCommentId) {
            return res.status(200).send({
                result: "false",
                message: "이미 지워진 댓글입니다.",
            });
        }

        if (!(placeComments.nickname == nickname)) {
            return res.status(200).send({
                result: "false",
                message: "닉네임이 일치하지 않습니다",
            });
        }

        await placeComment.deleteOne({
            placePostId: placePostId,
            placeCommentId: placeCommentId,
        });

        return res.status(200).send({
            result: "true",
            message: "댓글이 성공적으로 삭제되었습니다.",
        });
    } catch (err) {
        res.status(400).send({
            result: "false",
            message: "알 수 없는 에러가 발생하였습니다",
        });
    }
}

// 모집 대댓글 등록
// async function placeReCommentsCreate(req, res) {
//     try {
//         const { nickname, profileUrl } = res.locals.user;
//         const { placeCommentId } = req.params;
//         const { comment } = req.body;
//         let status = false;

//         // 댓글 찾기
//         const [findComment] = await placeComment.find({
//             placeCommentId: placeCommentId,
//         });

//         console.log(findComment);

//         if (!findComment.placePostId) {
//             return res.status(400).send({
//                 result: "false",
//                 message: "게시글 번호가 없습니다",
//             });
//         }

//         // 댓글 작성
//         const placeReComments = await placeReComment.create({
//             nickname: nickname,
//             profileUrl,
//             placePostId: findComment.placePostId,
//             placeCommentId: findComment.placeCommentId,
//             comment: comment,
//         });

//         console.log(placeReComments);

//         res.status(200).send({
//             result: "true",
//             message: "댓글이 성공적으로 등록되었습니다.",
//         });
//     } catch (err) {
//         res.status(400).send({
//             result: "false",
//             message: "댓글 작성 실패",
//         });
//     }
// }

// //모집 대댓글 조회
// async function placeReCommentsGet(req, res) {
//     try {
//         const { placeCommentId } = req.params;

//         const placeReComments = await placeReComment
//             .find({
//                 placeCommentId,
//             })
//             .sort({ createdAt: -1 });
//         console.log(placeReComments);

//         return res.status(200).send({
//             placeReComments,
//             message: "대댓글이 성공적으로 조회되었습니다.",
//         });
//     } catch (err) {
//         res.status(400).send({
//             result: "false",
//             message: "대댓글 전체조회 실패",
//         });
//     }
// }

// // 모집 대댓글 삭제
// async function placeReCommentsDelete(req, res) {
//     try {
//         const { placeCommentId, placeReCommentId } = req.params;
//         const { nickname } = res.locals.user;

//         const placeReComments = await placeReComment.findOne({
//             placeCommentId,
//             placeReCommentId,
//         });

//         if (!placeReComments.placeCommentId) {
//             return res.status(400).send({
//                 result: "false",
//                 message: "이미 지워진 댓글입니다.",
//             });
//         }

//         if (!(placeReComments.nickname == nickname)) {
//             return res.status(400).send({
//                 result: "false",
//                 message: "닉네임이 일치하지 않습니다",
//             });
//         }

//         await placeReComment.deleteOne({
//             nickname,
//             placeCommentId,
//             placeReCommentId,
//         });

//         return res.json({
//             success: true,
//             message: "대댓글 메시지가 성공적으로 삭제되었습니다.",
//         });
//     } catch (err) {
//         res.status(400).send({
//             result: "false",
//             message: "알 수 없는 에러가 발생하였습니다",
//         });
//     }
// }

module.exports = {
    placeComments,
    placeCommentsDelete,
};
