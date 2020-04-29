
const Posts = require("../models/posts");
const Comments = require("../models/comments");

module.exports.addComment = function(request , response){
   Posts.findById(request.body.post , function(error , post){
       if(error){
           console.log("Post does not exist");
           return;
       }
       Comments.create({
           content : request.body.content,
           post : request.body.post,
           user : request.user._id
       } , function(error , comment){
           post.comments.push(comment);
           post.save();

           return response.redirect("back");
       })
   })
    
}

module.exports.deleteComment = function(request , response){
    Comments.findById(request.params.id , function(error , comment){
        if(error){
            console.log("error in finding in db")
            return;
        }
        if(comment){
            if(comment.user == request.user.id){
                let postId = comment.post;
                comment.remove();
                Posts.findByIdAndUpdate(postId , { $pull : {comments : request.params.id}} , function(error , post){
                    return response.redirect("back");
                })
            }
        }else{
            return response.redirect("back");
        }
    })
}