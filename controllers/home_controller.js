const Posts = require("../models/posts");

module.exports.home = function(request , response){
    // console.log(request.cookies);
    // response.cookie("user_id" , 19);
    Posts.find({}).populate("user").exec(function(error , posts){
        if(error){
            console.log("error in finding posts");
            return;
        }
        return response.render("home" , {
            title:"Codeial | Home",
            posts : posts
        });
     } )
    } 
        
        
