
const Posts = require("../models/posts");
const Comments = require("../models/comments");
const commentsMailer = require("../mailer/comments_mailer");

module.exports.addComment = async function(request , response){

    try{
        let post = await Posts.findById(request.body.post);

        let comment = await Comments.create({
                content : request.body.content,
                post : request.body.post,
                user : request.user._id
            })

            comment = await comment.populate('user','name email').execPopulate();
                post.comments.push(comment);
                post.save();

                commentsMailer.newComment(comment);
                
                if(request.xhr){
                    return response.status(200).json({
                        comment : comment , 
                        message : "Comment Added Successfully"
                    })
                }
                request.flash("successs" , "Comment Added Successfully");
                return response.redirect("back");

    }catch(error){
        console.log("Error" , error);
        return;
    }
       
}

module.exports.deleteComment = async function(request , response){

    try{

        let comment = await Comments.findById(request.params.id);

        if(comment){
            if(comment.user == request.user.id){
                let postId = comment.post;
                comment.remove();
                Posts.findByIdAndUpdate(postId , { $pull : {comments : request.params.id}} , function(error , post){
                    request.flash("successs" , "Comment Delted Successfully");

                    if(request.xhr){
                        return response.status(200).json({
                            comment_id : request.params.id , 
                            message : "Comment Delted Successfully"
                        });
                    }
                    //return response.redirect("back");
                })
            }
        }else{
            return response.redirect("back");
        }

    }catch(error){
        console.log("Error" , error);
        return;
    }
    
    
}