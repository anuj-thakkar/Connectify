const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String , required: true },
  name: { type: String , required: true },
  email: { type: String, required: true, lowercase: true, validate: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/}
}, { timestamps: true });

userSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('User', userSchema);