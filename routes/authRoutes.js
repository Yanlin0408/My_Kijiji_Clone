// passort 需要在这里导入一遍
const passport = require("passport");

// 这个格式就是把这里面所有的API都导入到index.js里面
module.exports = (app) => {
  // 这个app就是express的实例，从index.js里面传进来的
  app.get(
    "/auth/google", // 创造 API URL
    // 呼叫 Google oauth， 我们要选泽选取scope，就是选取我们要提取那些信息
    // 然后弹出验证窗口，等待用户验证google账户
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
    // 直接传送给google，不经过我们后端的处理，我们只是个中间人。
  );

  app.get(
    "/auth/google/callback",
    // callback就是说用户验证google登陆成功，我们需要又一个redirect URL
    // 这里为什么不能直接跳转到 软件的前端页面，确实我们后端造的API假页面呢？
    // 因为你在用后端和Google API合作，你们都是虚拟的页面，所以没办法直接进入主页面
    passport.authenticate("google"),
    // 用户验证登录成功后，在进入虚拟callback 和 我们下面返回主页 中间，谷歌把用户信息授权给我们后端服务器
    (req, res) => {
      // 全部结束后，我们才可以返回主页。
      res.redirect("http://localhost:3000/");
    }
  );

  // 这里就是我们说的，前端发送个API请求专门索取用户信息，后端可以从req.user当中接收到用户信息
  // 然后很容易地通过res.send(req.user)返回给前端用户信息。
  app.get("/auth/current_user", (req, res) => {
    console.log("auth/current_user: ", req.user);
    res.send(req.user);
    // store user in cookie, every request has the user
  });

  app.get("/auth/logout", (req, res) => {
    req.logout();
    // redirect to main page by callback
    res.redirect("http://localhost:3000/");
  });
};
