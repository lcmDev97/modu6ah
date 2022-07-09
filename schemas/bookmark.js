const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const { Schema } = mongoose;

const bookmarkSchema = new Schema(
    {
        bookmarkId: { type: Number, unique: true},
        category: { type: Number },
        recruitPostId: { type: Number },
        placePostId: { type: Number },
        reviewPostId: { type: Number },
        nickname: { type: String },
        bookmarkCheck: { type: Boolean }
    },
    { timestamps: true }
);

bookmarkSchema.plugin(AutoIncrement, { inc_field: "bookmarkId" });
module.exports = mongoose.model("bookmark", bookmarkSchema);