const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const env = require("./environment");

let transporter = nodemailer.createTransport(env.smtp);

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