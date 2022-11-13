const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  username: { 
    type: String , 
    required: true 
  },

  name: { 
    type: String,
    required: true
  },
  
  email: { 
    type: String,
    required: true, 
    lowercase: true, 
    validate: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 
    unique: true 
  },

  connections: { 
    type: [{
      username: { 
        type: String, 
        required: true, 
        lowercase: true 
      },
      status: {
          type: Number,
          enums: [
              0,    //'add friend',
              1,    //'requested',
              2,    //'pending',
              3,    //'friends'
          ]
      }
    }], 
    required: true},

  bio: { 
    type: String, 
    required: true,
    default: ""
  },

  profilePicture: {
    type: String,
    default: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
  },

  followers: {
    type: [{
      username: {
        type: String,
        required: true,
      }
    }],
  },

  following: {
    type: [{
      username: {
        type: String,
        required: true,
      }
    }],
  },

  favSong: { 
    type: String, 
    required: true,
    default: ""
  },

  statusUpdate: { 
    type: String, 
    required: true,
    default: ""
  }

  // posts : { type: Array, required: true }
  // uid: { type: Number, required: true}
}, { timestamps: true });

userSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('User', userSchema);