const Posts = require("../models/posts");
const Comments = require("../models/comments");


module.exports.addPost = function(request , response){
    Posts.create({
        content : request.body.content ,
        user : request.user._id
    }, function(error , post){
        if(error){
            console.log("Error in adding posts to db");
            return;
        }
        
        return response.redirect("back");
    })
}

module.exports.deletePost = function(request , response){
    Posts.findById(request.params.id , function(error , post){
        if(post.user == request.user.id){
            post.remove();
            Comments.deleteMany({post : request.params.id} , function(error){
                return response.redirect("back");
            })
        }else{
            return response.redirect("back");
        }
    })
}