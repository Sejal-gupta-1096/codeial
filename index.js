//1) Setting up express server
const express = require("express");
const app = express();

const env = require("./config/environment");

//2)defining port no.
const port = 8000;

//6) Installing and acquiring express-ejs-layouts
const expressLayouts = require("express-ejs-layouts");

//9)Setting configuration for mongoose in config folder and requiring here (Connecting to database)
const db = require("./config/mongoose");

//11)Using cookies
const cookieParser = require("cookie-parser");

//12)Using passport for authentication and express session for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

//15)Using Passport JWT
const passportJWT = require("./config/passport-jwt-strategy");

//16)Google OAuth SignIn/SignUp
const passportGoogle = require("./config/passport-google-oauth2-strategy");

//13)Permanantly storing session in db
const MongoStore = require("connect-mongo")(session);

//14)Using sass
var sassMiddleware = require("node-sass-middleware");

const flash = require("connect-flash");
const customMVare = require("./config/middleware");

//Setting up another server for chat engine and passing our app to it
const chatServer = require("http").Server(app);

//setting up configuation for setting sockets on the chat server
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);

//For logging purppose
const morgan = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream");

chatServer.listen(5000, function (error) {
  if (error) {
    console.log("Error in setting up Chat Server");
  } else {
    console.log("Chat Server is listening on port 200");
  }
});

const prod_assets = require("./config/view_helpers")(app);

//setting config for using sass(it has to be written before the server starts so that it can compile all the sass files into css)

if (env.name == "development") {
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.assets_path, "scss"),
      dest: path.join(__dirname, env.assets_path, "css"),
      debug: true,
      outputStyle: "extended",
      prefix: "/css", // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
    })
  );
}

// setup the logger
app.use(morgan(env.morgan.mode, env.morgan.options));

//10)Setting middleware for decoding the post request
app.use(express.urlencoded({extended:false}));

//After requiring cookies we have to use this middleware for using cookies
app.use(cookieParser());

//7)Linking static files
app.use(express.static(path.join(__dirname, env.assets_path)));
console.log(__dirname + "/" + env.assets_path);

app.use(expressLayouts);

//8)Extracting links and scripts from individual pages and place them in head
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//5)Setting up View Enjine
app.set("view engine", "ejs");
app.set("views", "./views");

//using express session to encrypt user data and stores in the cookie (This cookie is then stored in database)
app.use(
  session({
    name: "codeial",
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (error) {
        console.log("Unable to store session cookie in database");
      }
    ),
  })
);

//initialising passport and using session
app.use(passport.initialize());
app.use(passport.session());

//setting user to locals of response
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMVare.setFlash);

app.use("/uploads", express.static(__dirname + "/uploads"));

//4) Acquiring Router Middleware
app.use("/", require("./routes/index"));

//3)Running ther server on defined port
app.listen(port, function (error) {
  if (error) {
    console.log(`Error in running the server :${error}`);
    return;
  }

  console.log(`Server is up and running on port : ${port}`);
});
