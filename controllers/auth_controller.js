const User = require('../models/users');
const AccessToken = require('../models/accessToken');
const resetPasswordMailer = require('../mailer/reset_password_mailer');
const crypto = require('crypto');
const { access } = require('fs');
const { localsName } = require('ejs');

module.exports.auth = function(request , response){

    return response.render('verify_email' , {
        title: "Codeial | Verify",
    });
}

module.exports.verifyEmail = async function(request , response){


    let user = await User.findOne({email : request.body.email});

    //console.log(user , request.body)
    if(user){

        let token = await crypto.randomBytes(20).toString("hex");
        let accessToken = await AccessToken.create({
           user : user,
           token :  token,
           isValid : true
        });

        resetPasswordMailer.resetPassword(accessToken);

        return response.render('account_verified' , {
            title: "Codeial | Account Verified",
        });
    }else{
        request.flash("error", "Account does not exist with this email");
        return response.redirect('back');
    }
}

module.exports.resetPassword = async function(request , response){
    
    let accessToken = await AccessToken.findOne({token : request.query.accessToken});
    console.log(accessToken ,'AccessToken' )
    if(accessToken){
        if(accessToken.isValid){
            return response.render('reset_password' , {
                title : 'Codeial | Reset Password',
                accessToken : accessToken.token
            })
        }
    }

    request.flash('error' , 'Token is Expired ! Pls regenerate it.');
    return response.redirect('/auth');
}

module.exports.reset = async function(request , response){
    console.log( request.query)
    let accessToken = await AccessToken.findOne({token : request.query.accessToken});
    console.log(accessToken ,'AccessToken' )
    if(accessToken){
        console.log('AccessToken Present' )
        if(accessToken.isValid){
            console.log('AccessToken is valid' )
            accessToken.isValid = false;
            if(request.body.password == request.body.confirm_password){
                console.log('Password  matchedd' )
                let user = await User.findById(accessToken.user);
                if(user){
                    console.log('User found' , user )
                    user.password = request.body.password;
                    user.confirm_password = request.body.confirm_password;
                    accessToken.save();
                    user.save();
                    console.log('Password changed' , user )
                    request.flash('success' , 'Password Changed');
                    return response.redirect('/users/sign-in');
                }
            }else{
                request.flash('error' , 'Password didnt matched');
                return response.redirect('back');
            }
            
           
        }
    }

    request.flash('error' , 'Token is Expired ! Pls regenerate it.');
    return response.redirect('/auth');
}