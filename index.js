//1) Setting up express server
const express = require("express");
const app = express();

//2)defining port no.
const port = 100;
 
//5) Installing and acquiring express-ejs-layouts
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

//4) Acquiring Router Middleware
app.use("/",require("./routes/index"));

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
