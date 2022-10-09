/**
 * @fileoverview This file holds the schema for Users
 * 
 */

 const mongoose = require("mongoose");

 const userSchema = new mongoose.Schema({
   email: { type: String, required: true, lowercase: true, validate: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/},
   password: { type: String , required: true },
   firstName: { type: String , required: true },
   lastName: { type: String , required: true },
   // cellPhone: { type: String, required: true, validate: /^\d{10}$/},
   accountType: { type: String, enum: ['standard', 'admin'], default: 'standard' }
 
 }, { timestamps: true });
 
 const usersDB = mongoose.connection.useDb('Users');
 const User = usersDB.model("User", userSchema);
 
 module.exports = User;