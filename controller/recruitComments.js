const recruitPost = require("../schemas/recruitPost"); 
const recruitComment = require("../schemas/recruitComment");
const User = require("../schemas/user");

// 모집 댓글 등록

async function recruitComments(req, res) {
    try {
        const { nickname } = res.locals.user;
        const { recruitPostId } = req.params;
        const { comment } = req.body;
        let status = false;
  
       
        
        // 게시글 찾기 
        const [findPost] = await recruitPost.find({ recruitPostId : recruitPostId });
        console.log(findPost.recruitPostId) ;
        // 게시글 작성
        const recruitComments = await recruitComment.create({
            nickname : nickname ,
            recruitPostId : findPost.recruitPostId, 
            comment : comment,
            
        });
        console.log(recruitComments)
  
        res.status(200).send({
            result: "true",
            message: "댓글이 성공적으로 등록되었습니다."
        });

        if(!findPost.postId){
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
        
        await recruitComment.deleteOne({ recruitPostId: Number(recruitPostId),
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

module.exports = {
    recruitComments,
    recruitCommentsDelete,
};