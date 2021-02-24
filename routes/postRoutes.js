const mongoose = require("mongoose");
const Post = mongoose.model("posts");
const User = mongoose.model("users");
const AWS = require("aws-sdk");
const keys = require("../config/keys");
const uuid = require("uuid/v1");

const s3 = new AWS.S3({
    accessKeyId: keys.AWSKeyId,
    secretAccessKey: keys.AWSSecretKey,
    region: keys.Region,
});

function requireLogin(req, res, next) {
    if (!req.user) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = (app) => {
    app.get("/api/image/upload", async(req, res) => {
        const key = `${req.user.id}/${uuid()}.jpeg`;
        s3.getSignedUrl(
            "putObject", {
                Bucket: keys.Bucket,
                ContentType: "image/*",
                Key: key,
            },
            (err, url) => res.send({ key, url })
        );
    });

    app.post("/api/post/create", async(req, res) => {
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

    app.get("/api/post/user/get", async(req, res) => {
        const posts = await Post.find();
        //const userPosts = posts.filter((post) => post.userId === req.user.id);
        const userPosts = posts.filter((post) => post.userId === req.user.googleId);
        res.send(userPosts);
    });

    app.get("/api/post/all/get", async(req, res) => {
        const posts = await Post.find();
        res.send(posts);
    });

    app.get("/api/post/:id", async(req, res) => {
        const post = await Post.findById(req.params.id);
        res.send(post);
    });

    app.post("/api/post/:id", requireLogin, async(req, res) => {
        await Post.findByIdAndDelete(req.params.id);
        res.send({});
    });

    //this API takes care of the inner changes in database 
    //no matter the user like or undo like for the post.
    app.post("/api/post/like/:postId", requireLogin, async(req, res) => {
        const post = await Post.findById(req.params.postId);
        const user = await User.findById(req.user.id);
        var shoppingList = user.shoppingList;
        var likes = post.likes;
        const array = likes.filter((like) => like === req.user.id);
        //if the currentuser already liked this post, we dont push his ID into the list
        if (array.length != 0) {
            //take out remaining likes in array
            likes = likes.filter((like) => {
                if (like != req.user.id) {
                    return like;
                }
            });
            //take out remaining iterms in current user's shoppingList
            shoppingList = shoppingList.filter((favItem) => {
                if (favItem != req.params.postId) {
                    return favItem;
                }
            });
            //update both the user and the post in the database
            await Post.findByIdAndUpdate(req.params.postId, { likes });
            await User.findByIdAndUpdate(req.user.id, { shoppingList });
            return res.send({});
        }
        //if the currentUser haven't like this post yet, we push his ID to the list
        //also push this good to his shoppingList
        else {
            //we modify the likes array and Update it in database
            likes.push(req.user.id);
            shoppingList.push(req.params.postId);
            await Post.findByIdAndUpdate(req.params.postId, { likes });
            await User.findByIdAndUpdate(req.user.id, { shoppingList });
            res.send({});
        }
    });
};