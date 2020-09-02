const Users = require("../models/users");
const Friendships = require("../models/friendships");
const fs = require("fs");
const path = require("path");

module.exports.profile = async function (request, response) {
  try {
   
    let user = await Users.findOne({ _id: request.query.id });

    let friendship1,friendship2

    friendship1 = await Friendships.findOne({
      from_user: request.user,
      to_user: request.params.id,
    });

    friendship2 = await Friendships.findOne({
      from_user: request.params.id,
      to_user: request.user,
    });

    
    let populated_user = await Users.findById(request.user).populate('friends');
    return response.render("users", {
      title: "Codeial | Profile",
      profile_user: user,
      populated_user
    });
  } catch (error) {
    console.log("Error", error);
    return;
  }
};

module.exports.update = async function (request, response) {
  try {
    if (request.user.id == request.query.id) {
      let user = await Users.findById(request.query.id);

      Users.uploadedAvtar(request, response, function (error) {
        if (error) {
          console.log("error");
          return;
        }

        // console.log(request.file);
        if (request.body.password != '' && request.body.password == request.body.confirm_password) {
          user.password = request.body.password;
          user.confirm_password = request.body.confirm_password;
        }
        user.name = request.body.name;
        user.email = request.body.email;

        //if file is present
        if (request.file) {
          //if already image is there then unlink that file
          
          if (
            user.avtar &&
            fs.existsSync(path.join(__dirname, "..", user.avtar))
          ) {
            fs.unlinkSync(path.join(__dirname, "..", user.avtar));
          }
          //and upload new file (replace old file with new file)
          user.avtar = Users.avtarPath + "/" + request.file.filename;
          
        }

        user.save();
        request.flash("successs", "Profile Updated Successfully");
        return response.redirect("back");
      });
    } else {
      return response.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.log("Error", error);
    return;
  }
};

module.exports.sign_up = function (request, response) {
  if (request.isAuthenticated()) {
    return response.redirect("/users/profile");
  }
  return response.render("sign_up", {
    title: "Codeial | Sign-Up",
  });
};

module.exports.sign_in = function (request, response) {
  console.log(request.user);
  if (request.isAuthenticated()) {
    return response.redirect("/users/profile");
  }

  return response.render("sign_in", {
    title: "Codeial | Sign-In",
  });
};

//Creating new user
module.exports.create_user = async function (request, response) {
  try {
    //checking for pwd and confirm pwd
    if (request.body.password != request.body.confirm_password) {
      return response.redirect("back");
    }
    //if user already exist then redirect else create new user
    let user = await Users.findOne({ email: request.body.email });

    if (user) {
      return response.redirect("back");
    } else {
      let user = await Users.create(request.body);
      return response.redirect("sign-in");
    }
  } catch (error) {
    console.log("Error", error);
    return;
  }
};

module.exports.createSession = function (request, response) {
  console.log(request.user);
  request.flash("success", "Logged In Successfully");
  console.log(request.flash);
  return response.redirect("/");
};

module.exports.destroySession = function (request, response) {
  request.logOut();
  request.flash("success", "You have signed out");
  console.log(request.flash);
  return response.redirect("/users/sign-in");
};
