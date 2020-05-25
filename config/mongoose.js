//First set alias for mongodb in system variables else if not done then write full path where mongodb is present

//1)Getting mongoose package
const mongoose = require("mongoose");

const env = require("./environment");

//2)Connecting to Mongodb database
mongoose.connect(`mongodb://localhost/${env.db}`);

//3)Acquiring the connection
const db = mongoose.connection;

//If connection fails
db.on("error" , console.error.bind(console , "Error Connecting to Database"));

//If successfully connected
db.once("open" , function(){
    console.log("Successfully connected to Database");
});

module.exports = db;