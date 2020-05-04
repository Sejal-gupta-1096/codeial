const Posts = require("../models/posts");
const User = require("../models/users");


// module.exports.home = function(request , response){
//     // console.log(request.cookies);
//     // response.cookie("user_id" , 19);
//     Posts.find({}).populate("user").populate({
//         path : "comments",
//         populate : {
//             path : "user"
//         }
//     }).exec(function(error , posts){

//         User.find({} , function(error , users){
//             if(error){
//                 console.log("error in finding posts");
//                 return;
//             }
//             return response.render("home" , {
//                 title:"Codeial | Home",
//                 posts : posts,
//                 all_users : users
//             });
//         })
        
//      } )
//     } 

//Writing Neater Code using ASYNC AWAIT


module.exports.home = async function(request , response){

    try{

        let posts =  await Posts.find({}).sort("-createdAt").populate("user").populate({
            path : "comments",
            populate : {
                path : "user"
            }
        })
    
        let users = await User.find({});

         return response.render("home" , {
            title:"Codeial | Home",
            posts : posts,
            all_users : users
         });

    }catch(error){
        console.log("Error : " , error);

    }
       
           
 } 
        
