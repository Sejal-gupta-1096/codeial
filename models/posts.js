const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
    content :{
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users"
    } , 
    comments :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Comments"
        }
    ],
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Likes"
    }
]
} , {
    timestamps : true
})

const Posts = mongoose.model("Posts" , postsSchema);
module.exports = Posts;