const mongoose = require("mongoose");

const { Schema } = mongoose;
const RecruitBookmarkSchema = new Schema({
    recruitPostId : { type : String, required: true },
    nickname : { type : String, required: true },
    createdAt : { type : date, required: true }
});

module.exports = mongoose.model("RecruitBookmark", RecruitBookmarkSchema);
