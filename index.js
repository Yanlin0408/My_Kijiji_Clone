const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const { json } = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");


app.use(json());

mongoose
  .connect(keys.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((err) => console.log(err));

// 设置 cookie session 环境
app.use(
  cookieSession({
    name: "session",
    maxAge: 12 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

// cookie session 环境是首位， 在创造真的 session前，一定把环境设置好。（环境 》 实例）
// passport就是用来处理authentication 的包
// 区别passport和express！
// express处理api，api是前后端连接的根本，在这种连接下，我们可能要传递用户信息，这种信息一定是经过加密处理才可以
// 所以，我们用passport来解决用户信息加密等问题，然后用加密好的信息才能通过api这个管道进行前后端传递
app.use(passport.initialize()); // 看到initialize就是创造实例，这个是创建passport实例
app.use(passport.session()); // 创建完实例，我们才能创建session实例

// require the mongoose model, before passport
require("./models/user");
require("./models/post");

require("./services/passport");

// using require for the express router
// authRoutes 其实就是user route，用来写所有和user有关的api
require("./routes/authRoutes")(app);
require("./routes/postRoutes")(app);

app.listen(4000, () => console.log("Listen to 4000"));
