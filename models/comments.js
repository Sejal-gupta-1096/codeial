const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users"
    } , 
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Posts"
    } , 
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Likes"
    }
]
} , {
    timeStamps : true
})

const Comments = mongoose.model("Comments" , commentsSchema);
module.exports = Comments;