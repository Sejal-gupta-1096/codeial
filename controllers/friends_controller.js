const Users = require("../models/users");

module.exports.addFriend = function(request , response){
    Users.findById(request.user._id , function(error , user){
        if(error){console.log("Error in finding user" , error);return}

        user.friends.push(request.query.id);
        user.save();

        Users.findById(request.query.id , function(error , user){
            if(error){console.log("Error in finding user" , error);return}
            user.friends.push(request.user._id);
            user.save();
        })
    })
    console.log(request.user);
    return response.redirect("back");
}