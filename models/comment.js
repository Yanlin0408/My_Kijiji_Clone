const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
    rating: Number,
    postId: String,
    commentContent: String,
    userId: String,
    userEmail: String,
    userName: String,
    userPhoto: String,
    createAt: Date,
    likes: Array,
    comment: Array,
});

mongoose.model("comments", commentSchema);