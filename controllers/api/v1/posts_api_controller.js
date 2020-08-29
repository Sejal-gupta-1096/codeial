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

        console.log(request.user._id , post.user)
        if(request.user.id == post.user){
            post.remove();
            let comments = await Comments.deleteMany({post : request.params.id});

            console.log('deleted' , post)
                return response.status(200).json({
                    post_id : request.params.id , 
                    message : "Post Deleted"
            
                })
            }else{
                console.log('not deleted' , post)
                return response.status(401).json({
                    message : 'You are not authorized to delete the post'
                })
            }
    }catch(error){
        console.log("Error" , error);
        return;
    }
    
   
}