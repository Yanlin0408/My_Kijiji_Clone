const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  content: String,
  price: Number,
  image: String,
  userId: String,
  userEmail: String,
  userName: String,
  userPhoto: String,
  createAt: Date,
});

mongoose.model("posts", postSchema);
