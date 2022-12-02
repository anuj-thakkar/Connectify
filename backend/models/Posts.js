const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({

    title: {
        type:String,
        required:true
    },

    text:{
        type:String,
        required:true
    },

    // type Array of object id in ref to user model
    likes:{
        type:Number,
        default:0
    },

    // type Array of object id in ref to user model
    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"User"}
    }],

    // type Array of object id in ref to user model
    postedBy:{
       type:String,
       required:true
    }
},{timestamps:true})

postSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });

module.exports = mongoose.model("Post", postSchema)