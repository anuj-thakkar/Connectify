const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({

    body:{
        type:String,
        required:true
    },

    // type Array of object id in ref to user model
    likes:[{type:ObjectId,ref:"User"}],

    // type Array of object id in ref to user model
    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"User"}
    }],

    // type Array of object id in ref to user model
    postedBy:{
       type:ObjectId,
       ref:"User"
    }
},{timestamps:true})

mongoose.model("Post",postSchema)