const mongoose = require("mongoose");

const { Schema } = mongoose;
const PlaceBookmarkkSchema = new Schema({
    placePostId: { type: Number },
    nickname: { type: String },
    profileUrl: { type: String },
    title: { type: String, required: true },
    content: { type: String, required: true },
    region: { type: String, required: true },
    imageUrl: { type: Array, required: true },
    star: { type: String, required: true },
    bookmarkStatus: {type : Boolean , default : true }, 
    category: { type: Number, default: 2 },
    createdAt: { type: String, required: true },
    adder : { type : String, required: true },
    markedAt : { type : Date, required: true },
    location : { type : String, required: true },
});

module.exports = mongoose.model("PlaceBookmark", PlaceBookmarkkSchema);
