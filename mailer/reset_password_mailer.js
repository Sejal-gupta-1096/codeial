const nodeMailer = require("../config/nodemailer");

module.exports.resetPassword = function(accessToken){

    let htmlString = nodeMailer.renderTemplate({accessToken:accessToken} , "/reset_password/reset_password.ejs");

    nodeMailer.transporter.sendMail({
        from: 'sejalg1096@gmail.com', // sender address
        to: accessToken.user.email, // list of receivers
        subject: "Codeial : Reset Password", // Subject line
        html: htmlString // html body
      } , function(error , info){
          if(error){console.log("Error in sending mail",error);return;}
          console.log("Message Sent" , info);
          return;
      });
}
