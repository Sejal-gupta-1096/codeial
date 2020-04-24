//Getting mongoose package
const mongoose = require("mongoose");

//Connecting to Mongodb database
mongoose.connect("mongodb://localhost/codeial_development");

//Acquiring the connection
const db = mongoose.connection;

//If connection fails
db.on("error" , console.error.bind(console , "Error Connecting to Database"));

//If successfully connected
db.once("open" , function(){
    console.log("Successfully connected to Database");
});

module.exports = db;