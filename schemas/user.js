const mongoose = require("mongoose");

const { Schema } = mongoose;
const UserSchema = new Schema({
    email: { type: String, required: true },
    nickname: { type: String, required: true },
    password: { type: String, required: true },
    myComment: { type: String },
    profileUrl: { type: String, default: 'https://changminbucket.s3.ap-northeast-2.amazonaws.com/basicProfile.png' },
    snsId: { type: String },
    provider: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
