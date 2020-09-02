const Likes = require("../models/likes");
const Comments = require("../models/comments");
const Posts = require("../models/posts");

module.exports.toggleLike = async function(request , response){

    try{
        
        let likeableType , deleted = false;
        let type='';

        if(request.query.type == "Posts"){
            likeableType = await Posts.findById(request.query.id).populate("likes");
            type='Posts'
        }else{
            likeableType = await Comments.findById(request.query.id).populate("likes");
            type='Comments'
        }

        let existingLike = await Likes.findOne({
            likeable : request.query.id,
            onModel : request.query.type,
            user : request.user
        });

        if(existingLike){
            likeableType.likes.pull(existingLike._id);
            likeableType.save();
            existingLike.remove();
            deleted = true;
        }else{
            let newLike = await Likes.create({
                user : request.user,
                likeable : request.query.id,
                onModel : request.query.type
            })

            likeableType.likes.push(newLike);
            likeableType.save();
            deleted = false;
        }

        if(request.xhr){
            return response.status(200).json({
                type:type,
                deleted : deleted , 
                likeableType : likeableType,
                message : "Request Successful"
            });
        }

            // return response.json(200 ,  {
            //     deleted : deleted ,
            //     message : "Request Successful"
            // })
        return response.redirect('back');
            
    }catch(error){

        console.log("Error : " , error);

        return response.json(500 , {
            message : "Internal Server Error"
        })
    }
}