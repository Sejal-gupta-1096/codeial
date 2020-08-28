const Users = require("../models/users");
const Friendships = require("../models/friendships");



module.exports.addFriend = async function(request , response){


    let existingFriendship = await Friendships.findOne({
        from_user : request.user,
        to_user : request.query.id,
    });

    let user = await Users.findById(request.user);
    let deleted = false;

    if(existingFriendship){
        user.friends.pull(existingFriendship._id);
        user.save();
        existingFriendship.remove();
    }else{
        let friendship = await Friendships.create({
            to_user : request.query.id,
            from_user : request.user._id
        });

        user.friends.push(friendship);
        user.save();
        deleted = true;
    }

    if(request.xhr){
        return response.status(200).json({
            deleted : deleted , 
            message : "Request Successful"
        });
    }

    
     return response.redirect("back");
}