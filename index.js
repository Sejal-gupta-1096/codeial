//1) Setting up express server
const express = require("express");
const app = express();

//2)defining port no.
const port = 100;

//4) Acquiring Router Middleware
app.use(require("./routes/index"));

//3)Running ther server on defined port
app.listen(port , function(error){
    if(error){
        console.log(`Error in running the server :${error}`);
        return;
    }

    console.log(`Server is up and running on port : ${port}`);
});
