const Users = require("../models/users");
const Friendships = require("../models/friendships");

module.exports.addFriend = async function(request , response){

    let friendship = await Friendships.create({
        to_user : request.query.id,
        from_user : request.user._id
    });


    let user = await Users.findById(request.user._id); 

        user.friends.push(friendship);
        user.save();

         user = await Users.findById(request.query.id); 

        user.friends.push(friendship);
        user.save();

     return response.redirect("back");
}