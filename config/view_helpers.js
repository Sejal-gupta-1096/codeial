
const path = require("path");
const fs = require("fs");

module.exports = function(app){
   
    app.locals.assetPath = function(filePath){
        console.log(filePath)
        //console.log( (path.join(__dirname , "../public/assets/rev-manifest.json/" , filePath)))
        if(eval(JSON.stringify(process.env.NODE_ENV)) == undefined){
            return "/" + filePath;
        }

        console.log( JSON.parse(fs.readFileSync(path.join(__dirname , "../public/assets/rev-manifest.json/")))[filePath])
       
        return  "/" + JSON.parse(fs.readFileSync(path.join(__dirname , "../public/assets/rev-manifest.json")))[filePath];
    }
}