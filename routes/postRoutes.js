const mongoose = require("mongoose");
const Post = mongoose.model("posts");
const User = mongoose.model("users");
const AWS = require("aws-sdk");
const keys = require("../config/keys");
const uuid = require("uuid/v1");
const requireLogin = require("../middleWares/requireLogin");

const s3 = new AWS.S3({
    accessKeyId: keys.AWSKeyId,
    secretAccessKey: keys.AWSSecretKey,
    region: keys.Region,
});

// function requireLogin (req, res, next) {
//     if (!req.user) {
//         console.log(" ----- no user!!");
//         // (res, req) => {
//         //     res.redirect('/');
//         // }
//         // return res.status(401).send({ error: " ------ you must login!" });
//         // res.redirect('/');
//         res.send({redirectUrl:'/'});
//     } else {
//         next();
//     }
// };

//it is exported to whoever "require" it
module.exports = (app) => {
    //find the post user currently click on
    app.get("/api/post/:id", async(req, res) => {
        const post = await Post.findById(req.params.id);
        res.send(post);
    });

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

    // create a new instance in "posts" collection in mongoDB
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

    //find all posts the current user owns and return them
    app.get("/api/post/user/get", async(req, res) => {
        const posts = await Post.find();
        const userPosts = posts.filter((post) => post.userId === req.user.googleId);
        res.send(userPosts);
    });

    //return the user's information after we checkout him
    app.get("/api/getAfterCheck/:userId", async(req, res)=>{
        const user = await User.findById(req.params.userId);
        res.send(user);
    })

    //find all posts the targeted user owns and return them
    app.get("/api/getUser'sPosts/:userId",async(req,res)=>{
        const user = await User.findById(req.params.userId);
        const posts = await Post.find();
        const postsWeWant = posts.filter((post) => post.userId === user.googleId);
        res.send(postsWeWant);
    });

    app.get("/api/totalLikesReceivedByUser/:userGoogleId", async(req, res) => {
        var countTotalLike = 0;
        const allUsers = await User.find();
        const theTargerUser = allUsers.filter((oneUser) => oneUser.googleId === req.params.userGoogleId);
        const user = await User.findById(theTargerUser[0]._id);
        const posts = await Post.find();
        const postsWeWant = posts.filter((post) => post.userId === user.googleId);
        postsWeWant.forEach(eachPost => {
            countTotalLike = countTotalLike + eachPost.likes.length;
        });
        console.log(countTotalLike);
        res.send({countTotalLike});
    });

    app.get("/api/allUserGoogleId", async(req, res) => {
        var allUserGoogleId = new Array();
        const users = await User.find();
        users.forEach(eachUser => {
            allUserGoogleId.push(eachUser.googleId);
        });
        res.send(allUserGoogleId);
    });

    //return all the posts we have in database
    app.get("/api/post/all/get", async(req, res) => {
        const posts = await Post.find();
        res.send(posts);
    });

    //return all the posts sorted by price
    app.get("/api/post/sort/byPrice", async(req, res) => {
        const posts = await Post.find();
        posts.sort((a, b) => a.price - b.price);
        res.send(posts);
    });

    //return all the posts sorted by price
    app.get("/api/post/sort/byPriceHighToLow", async(req, res) => {
        const posts = await Post.find();
        posts.sort((a, b) => b.price - a.price);
        res.send(posts);
    });

    //return all the posts sorted by date
    app.get("/api/post/sort/byDate", async(req, res) => {
        const posts = await Post.find();
        posts.sort((a, b) => b.createAt - a.createAt);
        res.send(posts);
    });

    //return all the posts sorted by alphabet
    app.get("/api/post/sort/byPopularity", async(req, res) => {
        const posts = await Post.find();
        posts.sort((a, b) => b.likes.length - a.likes.length);
        res.send(posts);
    });

    //delete post
    //remove the post in database and also remove it in user's shoppingList                                 
    app.post("/api/post/:id", requireLogin, async(req, res) => {
        await Post.findByIdAndDelete(req.params.id);
        res.send({});
    });

    //like post you are checking
    app.get("/api/like/fav", requireLogin, async(req, res) =>{
        //get all posts from the database
        const posts = await Post.find();
        const favItems = posts.filter((post) => {
            for (let singleLikeID of post.likes){
                if(singleLikeID === req.user.id) return post;
            } 
        });
        res.send(favItems);
    });

    //handle purchase after clicking "buy" button
    app.post("/api/buy/:postId", requireLogin, async(req, res) =>{
        const user = await User.findById(req.user.id);
        const post = await Post.findById(req.params.postId);
        var balance = user.balance;
        balance = balance - post.price;
        const buyerBalance = balance;
        await User.findByIdAndUpdate(req.user.id, { balance });
        const allUsers = await User.find();
        const sellerList = allUsers.filter((singleUser) => {return singleUser.googleId === post.userId});
        const seller = sellerList[0]
        const sellerBalance = seller.balance;
        balance = sellerBalance + post.price;
        await User.findByIdAndUpdate(seller._id, { balance });
        res.send({buyerBalance});
    });

    //find the seller's id
    app.get("/api/getUserIdBasedOnPost/:postId", requireLogin, async(req, res) =>{
        const post = await Post.findById(req.params.postId);
        const allUsers = await User.find();
        const sellerList = allUsers.filter((singleUser) => {return singleUser.googleId === post.userId});
        const sellerId = sellerList[0]._id;
        res.send(sellerId);
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