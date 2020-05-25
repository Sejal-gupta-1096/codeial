
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
            user: "sejalg1096", 
            pass: "placed@amazon" 
            }
      },
    google_client_id: "301378759041-u8ioi94va6g3gcqrnq5saq2mj5vi4a02.apps.googleusercontent.com",
    google_client_secret: "6g_OeHrQWAafGG8WBeqDSXu8",
    google_callback_url: "http://localhost:100/users/auth/google/callback" 
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
    google_callback_url: process.env.GOOGLE_CALLBACK_URL
}

module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);