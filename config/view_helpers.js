
const path = require("path");
const fs = require("fs");

module.exports = function(app){
    app.locals.assetPath = function(filePath){
        if(eval(JSON.stringify(process.env.NODE_ENV)) == undefined){
            return filePath;
        }

        return "/" + JSON.parse(fs.readFileSync(path.join(__dirname , "../public/assets/rev-manifest.json")))[filePath];
    }
}