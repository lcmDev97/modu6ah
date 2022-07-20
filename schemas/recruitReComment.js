const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;

const recruitReCommentSchema = new Schema(
    {
        recruitReCommentId: { type: Number }, // 대댓글 번호
        recruitCommentId: { type: Number }, // 댓글 번호
        recruitPostId: { type: Number }, // 댓글 단 게시글 번호
        nickname: { type: String }, // 댓글 작성자
        profileUrl: { type: String }, // 댓글 작성자 프로필 이미지
        comment: { type: String, required: true }, // 댓글 내용
    },
    { timestamps: true } // 댓글 생성 및 수정날짜
);

recruitReCommentSchema.plugin(autoIncrement, {inc_field: "recruitReCommentId"});

module.exports = mongoose.model("recruitReComment", recruitReCommentSchema);