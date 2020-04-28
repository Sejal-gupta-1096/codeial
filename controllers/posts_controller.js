const Posts = require("../models/posts");

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