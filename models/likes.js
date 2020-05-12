const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId
    },

    likeable : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        refPath : "onModel"
    } , 
    onModel : {
        type : String,
        required : true,
        enum : ["Posts" , "Comments"]
    }
} , {
    timestamps : true
})

const Likes = mongoose.model("Likes" , likesSchema);
module.exports = Likes;