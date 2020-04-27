//1) Setting up express server
const express = require("express");
const app = express();

//2)defining port no.
const port = 100;
 
//6) Installing and acquiring express-ejs-layouts
const expressLayouts = require("express-ejs-layouts");

//9)Connecting to database
const db = require("./config/mongoose");

//11)Using cookies
const cookieParser = require("cookie-parser");
//12)Using express session for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

const MongoStore = require("connect-mongo")(session);

//10)Setting middleware for decoding the post request
app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);


app.use(session({
    name : "codeial",
    secret : "somethingsomething" , 
    saveUninitialized : false,
    resave : false , 
    cookie : {
        maxAge : (1000 * 60 * 100)
    } , 
    store : new MongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled'
    } , function(error){
        console.log("Unable to store session cookie in database");
    })
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//4) Acquiring Router Middleware
app.use("/",require("./routes/index"));

//7)Linking static files
app.use(express.static("./assets"));

//8)Extracting links and scripts from individual pages and place them in head
app.set("layout extractStyles" ,true);
app.set("layout extractScripts" ,true);


//5)Setting up View Enjine
app.set("view engine" , "ejs");
app.set("views" , "./views");

//3)Running ther server on defined port
app.listen(port , function(error){
    if(error){
        console.log(`Error in running the server :${error}`);
        return;
    }

    console.log(`Server is up and running on port : ${port}`);
});
