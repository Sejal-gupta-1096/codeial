const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const Users = require("./../models/users");
const env = require("./environment");


passport.use(new GoogleStrategy({
    clientID : env.google_client_id,
    clientSecret : env.google_client_secret,
    callbackURL : env.google_callback_url
  },function(accessToken , refreshToken , profile , done){
      Users.findOne({email:profile.emails[0].value}).exec(function(error,user){
          if(error){
              console.log("Error in finding user");
              return;
          }

          console.log(profile);
          //if found user set it in request.user
          if(user){
              return done(null , user);
          }else{
              //if not found in user then create and then set it in request.user
              Users.create({
                  name:profile.displayName,
                  email:profile.emails[0].value,
                  password:crypto.randomBytes(20).toString("hex")
              } , function(error , user){
                  if(error){
                      console.log("error in creating user");
                      return;
                  }else{
                      return done(null , user);
                      
                  }
              })
          }
      })
  })
)

module.exports = passport;