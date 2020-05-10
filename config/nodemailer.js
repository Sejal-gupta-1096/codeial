const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

let transporter = nodemailer.createTransport({
    service : "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "sejalg1096", 
      pass: "placed@amazon" 
    }
  });

 let renderTemplate = function(data , relativePath){

    let mailHtml;
    ejs.renderFile(
        path.join(__dirname , "../views/mailer" , relativePath),
        data,
        function(error , template){
            if(error){console.log("Error in returning template",error);return}

            console.log(__dirname);
            mailHtml = template;
        }
    )
    return mailHtml;
 }

 module.exports = {
     transporter : transporter,
     renderTemplate : renderTemplate
 }