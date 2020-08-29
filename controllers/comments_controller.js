const Posts = require("../models/posts");
const Comments = require("../models/comments");
const commentsMailer = require("../mailer/comments_mailer");
const Likes = require("../models/likes");
const queue = require('../config/kue');
const emailsWorker = require('../workers/comments_email_worker');

module.exports.addComment = async function (request, response) {
  try {
    let post = await Posts.findById(request.body.post);

    let comment = await Comments.create({
      content: request.body.content,
      post: request.body.post,
      user: request.user._id,
    });

    comment = await comment.populate("user", "name email").execPopulate();
    post.comments.push(comment);
    post.save();

    //commentsMailer.newComment(comment);

    let job = queue.create('emails' , comment).save(function(error){
      if(error){
        console.log('error in pushing mails to queue' , error);
         return;
        }

      console.log('job enqueued');
    })
    if (request.xhr) {
      return response.status(200).json({
        comment: comment,
        message: "Comment Added Successfully",
      });
    }
    request.flash("successs", "Comment Added Successfully");
    return response.redirect("back");
  } catch (error) {
    console.log("Error", error);
    return;
  }
};

module.exports.deleteComment = async function (request, response) {
  try {
    let comment = await Comments.findById(request.params.id);

    //console.log(comment);
    if (comment) {
      if (comment.user == request.user.id) {
        let postId = comment.post;
        comment.remove();
        let post = Posts.findByIdAndUpdate(postId, {
          $pull: { comments: request.params.id },
        });
        await Likes.deleteMany({ likeable: comment._id, onModel: "Comments" });

        request.flash("successs", "Comment Deleted Successfully");

        if (request.xhr) {
          return response.status(200).json({
            comment_id: request.params.id,
            message: "Comment Delted Successfully",
          });
        }
        return response.redirect("back");
      }
    } else {
      return response.redirect("back");
    }
  } catch (error) {
    console.log("Error", error);
    return;
  }
};
