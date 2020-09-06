//For logging purppose
const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream');
const fs = require("fs");

var logDirectory = path.join(__dirname, "..",'production_logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
  })


const development = {
    name : "development",
    assets_path : "/assets",
    session_cookie_key : "somethingsomething",
    db : "codeial_development",
    smtp : {
            service : "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: "sample@gmail.com", 
            pass: "*****" 
            }
      },
    google_client_id: "301378759041-u8ioi94va6g3gcqrnq5saq2mj5vi4a02.apps.googleusercontent.com",
    google_client_secret: "6g_OeHrQWAafGG8WBeqDSXu8",
    google_callback_url: "http://localhost:100/users/auth/google/callback" ,
    morgan : {
      mode : "dev",
      options : {stream: accessLogStream}
    }
}

const production = {
    name : "production",
    assets_path : process.env.ASSETS_PATH,
    session_cookie_key : process.env.SESSION_COOKIE_KEY,
    db : process.env.DB,
    smtp : {
            service : "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME, 
            pass: process.env.CODEIAL_GMAIL_PASSWORD 
            }
      },
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.GOOGLE_CALLBACK_URL,
    morgan : {
      mode : "combined",
      options : {stream: accessLogStream}
    }
}


//module.exports = development
module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);