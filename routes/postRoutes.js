const mongoose = require("mongoose");
const Post = mongoose.model("posts");
const AWS = require("aws-sdk");
const keys = require("../config/keys");
const uuid = require("uuid/v1");

const s3 = new AWS.S3({
  accessKeyId: keys.AWSKeyId,
  secretAccessKey: keys.AWSSecretKey,
  region: keys.Region,
});

module.exports = (app) => {
  app.get("/api/image/upload", async (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;
    s3.getSignedUrl(
      "putObject",
      {
        Bucket: keys.Bucket,
        ContentType: "image/*",
        Key: key,
      },
      (err, url) => res.send({ key, url })
    );
  });

  app.post("/api/post/create", async (req, res) => {
    await new Post({
      title: req.body.title,
      content: req.body.content,
      image: req.body.imageURL,
      price: req.body.price,
      userId: req.user.googleId,
      userEmail: req.user.email,
      userName: req.user.displayName,
      userPhoto: req.user.photo,
      createAt: new Date(),
    }).save();
    res.send({});
  });

  app.get("/api/post/user/get", async (req, res) => {
    const posts = await Post.find();
    const userPosts = posts.filter((post) => post.userId === req.user.id);
    res.send(userPosts);
  });

  app.get("/api/post/all/get", async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
  });

  // app.get("/api/post/:id", async(req, res) => {
  //   const post = await Post.findById(req.params.id);
  //   res.send(post),
  // });
};
