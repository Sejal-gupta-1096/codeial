const Users = require("../models/users");
const Friendships = require("../models/friendships");



module.exports.addFriend = async function(request , response){


    let existingFriendship = await Friendships.findOne({
        from_user : request.user,
        to_user : request.query.id,
    });

    let toUser = await Users.findById(request.user);
    let fromUser = await Users.findById(request.query.id);

    let deleted = false;

    if(existingFriendship){
        toUser.friends.pull(existingFriendship._id);
        fromUser.friends.pull(existingFriendship._id);
        toUser.save();
        fromUser.save();
        existingFriendship.remove();
        deleted = true;
        removeFriend = true;
    }else{
        let friendship = await Friendships.create({
            to_user : request.query.id,
            from_user : request.user._id
        });

        toUser.friends.push(friendship);
        fromUser.friends.push(friendship);
        toUser.save();
        fromUser.save();
    }

    if(request.xhr){
        return response.status(200).json({
            deleted : deleted , 
            message : "Request Successful",
        });
    }


    console.log(populated_user);
     return response.redirect("back" , {
     });
}