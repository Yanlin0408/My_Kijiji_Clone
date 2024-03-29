// passort 需要在这里导入一遍
const passport = require("passport");

// 这个格式就是把这里面所有的API都导入到index.js里面
module.exports = (app) => {
  // 这个app就是express的实例，从index.js里面传进来的
  app.get(
    "/auth/google", 
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
    // 直接传送给google，不经过我们后端的处理，我们只是个中间人。
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      //production change
      res.redirect("/");
    }
  );

  app.get("/auth/current_user", (req, res) => {
    try {
      res.send(req.user);
    } catch (e) {
      console.log(e);
    }
    
    // store user in cookie, every request has the user
  });

  app.get("/auth/logout", (req, res) => {
    req.logout();
    //production change
    // redirect to main page by callback
    res.redirect("/");
    // res.redirect("https://hanime.tv/");
  });
};
