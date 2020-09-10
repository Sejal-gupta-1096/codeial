const Posts = require("../models/posts");
const User = require("../models/users");
const passport = require("../config/passport-local-strategy");
const Friendships = require("../models/friendships");

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

module.exports.home = async function (request, response) {
  try {
    let posts = await Posts.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "comments",
        populate: {
          path: "likes",
        },
      })
      .populate("likes");

  
    let users = await User.find({});

    let user;
    if (request.user) {
      user = await User.findById(request.user._id)
        .populate({
          path: "friends",
          populate: {
            path: "from_user",
          },
        })
        .populate({
          path: "friends",
          populate: {
            path: "to_user",
          },
        });
    }

    

    return response.render("home", {
      title: "Codeial | Home",
      posts: posts,
      all_users: users,
      user: user,
    });
  } catch (error) {
    console.log("Error : ", error);
  }
};
