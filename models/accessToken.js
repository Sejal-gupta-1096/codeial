const mongoose = require("mongoose");

const accessTokenSchema = new mongoose.Schema({
    token : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users",
        required : true
    } , 
    isValid : {
        type : Boolean,
        required : true
    }
} , {
    timeStamps : true
})

const AccessToken = mongoose.model("AccessToken" , accessTokenSchema);
module.exports = AccessToken;