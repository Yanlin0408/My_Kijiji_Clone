const mongoose = require("mongoose");
const Comment = mongoose.model("comments");
const keys = require("../config/keys");

//it is exported to whoever "require" it
module.exports = (app) => {
    // create a new instance in "posts" collection in mongoDB
    app.post("/api/comment/create", async(req, res) => {
        await new Comment({
            commentContent: req.body.commentContent,
            rating: req.body.rating,
            postId: req.body.postId,
            userId: req.user.googleId,
            userEmail: req.user.email,
            userName: req.user.displayName,
            userPhoto: req.user.photo,
            createAt: new Date(),
        }).save();
    });

    app.get("/api/comment/all/get", async(req, res) => {
        const comment = await Comment.find();
        res.send(comment);
    });

    app.get("/api/comment/get/:id", async(req, res) => {
        const comments = await Comment.find();
        const currentPostComment = comments.filter((singleComment) => {
            return singleComment.postId === req.params.id;
        });
        res.send(currentPostComment);
    })

    //delete comment
    //remove the comment in database and also remove it in user's shoppingList                                 
    app.post("/api/comment/delete/:id", async(req, res) => {
        await Comment.findByIdAndDelete(req.params.id);
        res.send({});
    });
};