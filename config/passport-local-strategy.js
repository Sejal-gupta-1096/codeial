//1)Require passport and strategy
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/users");

//2)Tell passport to use this Strategy
passport.use(new LocalStrategy({
    usernameField : "email"
} , function(email , password , done){
    //3)find the user 
    User.findOne({email : email} , function(error , user){
        if(error){
            console.log("Error in finding user");
            return done(error);
        }

        if(!user || user.password != password){
            console.log("Invalid username and password");
            return done(null , false);
        }

        return done(null , user);
    })
}))

//Serializing the user or encrypting the key passed in cookie
passport.serializeUser(function(user , done){
    done(null , user._id);
})

//Deserializing the key in cookie or dencrypting to authenticate or find the user
passport.deserializeUser(function(id , done){
    User.findById(id , function(error , user){
        if(error){
            console.log("Error in finding user");
            return done(error);
        }
        return done(null , user);
    })
})

//This is check for the request (other than sign-in) made by browser to the server if is authenticated or not
passport.checkAuthentication = function(request , response , next){
    if(request.isAuthenticated()){
        return next();
    }

    return response.redirect("/users/sign-in")
}

//This is for that request.user contains the current user from the seession cookie and we are sending that user to the locals for views
passport.setAuthenticatedUser = function(request , response , next){
    if(request.isAuthenticated()){
        response.locals.user = request.user
    }
    next();
}

module.exports = passport;