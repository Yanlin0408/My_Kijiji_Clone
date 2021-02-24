const mongoose = require("mongoose");
const { Schema } = mongoose;
// Schema 算是一个模型，就是数据库的模型model叫做Schema

const userSchema = new Schema({
    // 我们创造一个 userSchema， 很好理解，就是用户模型，用来存储和提取用户
    // 这里面我们就需要三个东西，id， 用户名， 和钱包余额（我们不做银行卡啥的，就显示个数）
    googleId: String,
    displayName: String,
    email: String,
    photo: String,
    balance: Number,
    shoppingList: Array,
    // Schema 写法就是名字 冒号 数据类型
});

mongoose.model("users", userSchema);