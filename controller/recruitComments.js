const recruitPost = require("../schemas/recruitPost"); 
const recruitComment = require("../schemas/recruitComment");
const recruitReComment = require("../schemas/recruitReComment");
const User = require("../schemas/user");

// 모집 댓글 등록
async function recruitComments(req, res) {
    try {
        const { nickname, profileUrl } = res.locals.user;
        const { recruitPostId } = req.params;
        const { comment } = req.body;
        let status = false;
        
        // 게시글 찾기 
        const [findPost] = await recruitPost.find({ recruitPostId : recruitPostId });
        console.log(findPost.recruitPostId) ;
        // 게시글 작성
        const recruitComments = await recruitComment.create({
            nickname : nickname ,
            profileUrl,
            recruitPostId : findPost.recruitPostId, 
            comment : comment,
            
        });
        console.log(recruitComments)
  
        res.status(200).send({
            result: "true",
            message: "댓글이 성공적으로 등록되었습니다."
        });

        if(!findPost.recruitPostId){
            res.status(400).send({
                result: "false",
                message: "게시글 번호가 없습니다 "
            });
        }
    } 
    catch (err) {
        res.status(400).send({
            result: "false",
            message: "댓글 작성 실패"
        });
    }
 };

// 모집 댓글 삭제 
async function recruitCommentsDelete(req, res) {
    try {
        const { recruitPostId, recruitCommentId } = req.params;
        const { nickname } = res.locals.user;
        
        const recruitComments = await recruitComment.findOne({ 
            recruitPostId: Number(recruitPostId),
            recruitCommentId: Number(recruitCommentId),
        });

        if(!recruitComments.recruitPostId){
            return res.status(200).send({  
            result: "false",
            message: "이미 지워진 댓글입니다."
            });
        };
        
        if (!(recruitComments.nickname==nickname)) {
            return res.status(200).send({  
                result: "false",
                message: "닉네임이 일치하지 않습니다"
            });
        }  
        
        await recruitComment.deleteOne({ 
            recruitPostId: Number(recruitPostId),
            recruitCommentId: Number(recruitCommentId),
        });
        await recruitReComment.deleteMany({ 
            recruitPostId: Number(recruitPostId),
            recruitCommentId: Number(recruitCommentId),
        });
        
        return res.json({ success: true })
    } 
    catch (err) {
        res.status(400).send({
            result: "false",
            message: "알 수 없는 에러가 발생하였습니다"
        });
}};

/**
  * 대댓글 등록 / 조회 / 삭제 기능 구현 
  * 일자 : 2022-07-19
  * 안재훈 
  * */

// 모집 대댓글 등록 
async function recruitReCommentsCreate(req, res) {
    try {
        const { nickname, profileUrl } = res.locals.user;
        const { recruitCommentId } = req.params;
        const { comment } = req.body;
        const createdAt = moment().add('9','h').format('YYYY-MM-DD HH:mm');
        let status = false;
        
        // 댓글 찾기 
        const [findComment] = await recruitComment.find({ 
            recruitCommentId : recruitCommentId ,
        });

        console.log(findComment.recruitCommentId);

        // 댓글 작성
        const recruitReComments = await recruitReComment.create({
            nickname : nickname,
            profileUrl,
            recruitPostId : findComment.recruitPostId, 
            recruitCommentId : findComment.recruitCommentId,
            comment : comment,
            createdAt
        });
        console.log(recruitReComments)
  
        res.status(200).send({
            result: "true",
            message: "댓글이 성공적으로 등록되었습니다."
        });

        if(!findComment.recruitPostId){
            res.status(400).send({
                result: "false",
                message: "게시글 번호가 없습니다 "
            });
        }
    } 
    catch (err) {
        res.status(400).send({
            result: "false",
            message: "댓글 작성 실패"
        });
    }
 };

 //모집 대댓글 조회 
 async function recruitReCommentsGet(req, res) {
    try {
      const { recruitCommentId } = req.params;

      const recruitReComments = await recruitReComment.find({       
        recruitCommentId
    }).sort({ createdAt: -1 });
   //console.log(recruitReComments)  
    
   return res.status(200).send({ 
      recruitReComments,
      message: "대댓글이 성공적으로 조회되었습니다."
   });

    } catch (err) {
        res.status(400).send({
            result: "false",
            message: "대댓글 전체조회 실패"
        });
    }
};

// 모집 대댓글 삭제 
async function recruitReCommentsDelete(req, res) {
    try {
        const { recruitCommentId, recruitReCommentId } = req.params;
        const { nickname } = res.locals.user;
        
        const recruitReComments = await recruitReComment.findOne({ 
            recruitCommentId: Number(recruitCommentId),
            recruitReCommentId: Number(recruitReCommentId),         
        });

        if(!recruitReComments.recruitCommentId){
            return res.status(400).send({  
            result: "false",
            message: "이미 지워진 댓글입니다."
            });
        };
        
        if (!(recruitReComments.nickname==nickname)) {
            return res.status(400).send({  
                result: "false",
                message: "닉네임이 일치하지 않습니다"
            });
        }  
        
        await recruitReComment.deleteOne({ 
            nickname ,
            recruitCommentId: Number(recruitCommentId),
            recruitReCommentId: Number(recruitReCommentId),
        });
        
        return res.json({ 
            success: true,
            message: "대댓글 메시지가 성공적으로 삭제되었습니다." 
            })
    } 
    catch (err) {
        res.status(400).send({
            result: "false",
            message: "알 수 없는 에러가 발생하였습니다"
        });
}};

module.exports = {
    recruitComments,
    recruitCommentsDelete,
    recruitReCommentsCreate,
    recruitReCommentsGet,
    recruitReCommentsDelete,
};