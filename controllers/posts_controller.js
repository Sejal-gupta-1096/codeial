const Posts = require("../models/posts");
const Comments = require("../models/comments");


module.exports.addPost = async function(request , response){
    
    try{
        let post = await Posts.create({
            content : request.body.content ,
            user : request.user._id
        });

        post = await post.populate('user','name').execPopulate();

        if(request.xhr){
            return response.status(200).json({
                post : post,
                message : "Post Created"
            })
        }
        //Coomented these two lines when added the above AJAX
        // request.flash("successs" , "Post Created Successfully");
        // return response.redirect("back");

    }catch(error){
        request.flash("error" , error);
        return response.redirect("back");
    }
    
   
}

module.exports.deletePost = async function(request , response){

    try{
        let post = await Posts.findById(request.params.id);

        if(post.user == request.user.id){
            post.remove();
            let comments = await Comments.deleteMany({post : request.params.id});

            if(request.xhr){
                return response.status(200).json({
                    post_id : request.params.id , 
                    message : "Post Deleted"
                });
            }
            request.flash("successs" , "Post Deleted Successfully");
                // return response.redirect("back");
        }else{
            return response.redirect("back");
        }
    }catch(error){
        console.log("Error" , error);
        return;
    }
    
   
}