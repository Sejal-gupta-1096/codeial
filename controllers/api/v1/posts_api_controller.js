const Posts = require("../../../models/posts");
const Comments = require("../../../models/comments");

module.exports.index = async function(request , response){
    let posts =  await Posts.find({}).sort("-createdAt").populate("user").populate({
        path : "comments",
        populate : {
            path : "user"
        }
    })
    return response.json(200 , {
        message : "Lists of Posts",
        post : posts
    })
}

module.exports.deletePost = async function(request , response){

    try{
        let post = await Posts.findById(request.params.id);
            post.remove();
            let comments = await Comments.deleteMany({post : request.params.id});

            
                return response.status(200).json({
                    post_id : request.params.id , 
                    message : "Post Deleted"
            
                })
    }catch(error){
        console.log("Error" , error);
        return;
    }
    
   
}