const nodeMailer = require("../config/nodemailer");

module.exports.newComment = function(comment){

    let htmlString = nodeMailer.renderTemplate({comment:comment} , "/comments/new_comment.ejs");

    nodeMailer.transporter.sendMail({
        from: 'sejalg1096@gmail.com', // sender address
        to: comment.user.email, // list of receivers
        subject: "New Comment Published", // Subject line
        html: htmlString // html body
      } , function(error , info){
          if(error){console.log("Error in sending mail",error);return;}
          console.log("Message Sent" , info);
          return;
      });
}
