
const Users = require("../models/users");


module.exports.profile = async function(request , response){

    try{
        let user = await Users.findById(request.params.id );

        return response.render("users" , {
            title:"Codeial | Profile",
            profile_user : user
        });

    }catch(error){
        console.log("Error" , error);
        return;
    }
    
}

module.exports.update = async function(request , response){

    try{
        if(request.user.id == request.params.id){
            let user = await Users.findByIdAndUpdate(request.params.id , request.body);
    
                return response.redirect("back");
        }else{
            return response.status(401).send("Unauthorized");
        }

    }catch(error){
        console.log("Error" , error);
        return;
    }
    
}


module.exports.sign_up = function(request , response){

    if(request.isAuthenticated()){
        return response.redirect("/users/profile");
    }
    return response.render("sign_up" , {
        title:"Codeial | Sign-Up"
    });
}

module.exports.sign_in = function(request , response){
    if(request.isAuthenticated()){
        return response.redirect("/users/profile");
    }

    
    return response.render("sign_in" , {
        title:"Codeial | Sign-In"
    });
}

module.exports.create_user = async function(request , response){

    try{
        
        if(request.body.password != request.body.confirm_password){
            return response.redirect("back");
        }
    
        let user = await  Users.findOne({email:request.body.email}); 
    
            if(user){
                return response.redirect("back");
            }else{
                let user = await Users.create(request.body); 
                return response.redirect("sign-in");
            }

    }catch(error){
        console.log("Error" , error);
        return;
    }
    
}

module.exports.createSession = function(request , response){

    request.flash("success" , "Logged In Successfully");
    return response.redirect("/");
}

module.exports.destroySession = function(request , response){
    request.logOut();
    request.flash("success" , "You have signed out");
    return response.redirect("/");
}

