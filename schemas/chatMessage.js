const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatMessageSchema = new Schema(
    {
        roomId: { type: Number },
        profileUrl: { type: String }, // senderNick의 profileUrl
        profileUrlTwo: { type: String },
        senderNick: { type: String },
        receiverNick: { type: String },
        message: { type: String },
        time: { type: String },
        // checkChat: { type: Boolean } // 채팅 읽지 않은 개수 표시해주기 위함
    },
    { timestamps: true }
);

module.exports = mongoose.model("chatMessage", chatMessageSchema);