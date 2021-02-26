const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, callback) => {
  // for encoding user's id, only the server can understand this encoded string belongs to this user.
  callback(null, user.id);
});

passport.deserializeUser(async (id, callback) => {
  // decoding string to user's id.
  const user = await User.findById(id);
  callback(null, user);
});

// 这个use是middleware插件，就是说我们用passport帮助我们做authentication
// 然后这次呢这个authentication我们用google oauth这个插件来做


passport.use(
  // 创造google oauth 实例
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // callbackURL: "/auth/google/callback",
      callbackURL: "https://kijijiclone.herokuapp.com/auth/google/callback",
      proxy: true,
      // this callbackurl is our service’s url,
      // this needs to be set up in the google API redirect url.
    },
    async (accessToken, refreshToken, profile, callback) => {
      // 虽然这两个token没用，但我们还是要写上去，因为接收参数结果的时候这个位置很重要。
      try {
        // we check whether or not the user is in MongoDB already
        const doc = await User.findOne({ googleId: profile.id }); // User is a Mongo Class
        // 为什么是 profile.id, google自己取得名字和结构，就这么记就好
        // 然后我们把这个ID写进数据库的时候写成 googleId，因为我们自己数据库里的每个数据都有一个MongoDB ID，不要混淆。
        if (doc) {
          // 如果这个用户已经存在于我们的数据库了，我们就直接返回我们数据库的用户信息
          return callback(null, doc); // callback for google oauth
          // null means no error, and user is doc
        } else {
          // 如果没有这个用户的话，那么我们就要新建用户到我们的数据库
          const user = await new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
            balance: 1000,
          }).save();
          // 为什么有的时候是【0】有的时候直接 . 就可以？ google自己传递JSON的数据类型，我们也不知道
          // 所以经常使用console。log（）查看一下他返回来的是什么，然后跟她他给的数据类型，来提取我们要的东西
          return callback(null, user);
          // those return callback is pass the user information into cookie session
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);