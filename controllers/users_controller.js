
const Users = require("../models/users");

module.exports.profile = function(request , response){
    return response.render("users" , {
        title:"Codeial | Profile"
    });
}

module.exports.sign_up = function(request , response){
    return response.render("sign_up" , {
        title:"Codeial | Sign-Up"
    });
}

module.exports.sign_in = function(request , response){
    return response.render("sign_in" , {
        title:"Codeial | Sign-In"
    });
}

module.exports.create_user = function(request , response){
    if(request.body.password != request.body.confirm_password){
        return response.redirect("back");
    }

    Users.findOne({email:request.body.email} , function(error , user){
        if(error){
            console.log("Error in finding user from database");
            return;
        }

        if(user){
            return response.redirect("back");
        }else{
            Users.create(request.body, function(error , user){
                if(error){
                     console.log("Error in Creating user in database");
                     return;
                }
                    return response.redirect("sign-in");
                
            })
        }
    })
}