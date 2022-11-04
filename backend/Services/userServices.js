/**
 * @fileoverview This file holds all functions to handle creation and modification of users
 */

 const mongoose = require('mongoose');
 const User = require('../models/User');
 const constants = require('../constants');
 
 /**
 
 /**
  * This function takes in an email and password and attempts to create a user
  * in the database.
  *
  * @param {String} addMe.email the email of the user to be created
  * @param {String} addMe.password the password of the user to be created
  * @param {String} addMe.firstName the first name of the user to be created
  * @param {String} addMe.lastName the last name of the user to be created
  * @returns {String} the string response (Success or Failure)
  */
 exports.addUser = async function (addMe) {
   try {
     addMe.email = addMe.email.toLowerCase();
     let exists = await User.find({ email: addMe.email });
     if (exists.length > 0) {
       return constants.U_EMAIL_TAKEN;
     }
     const salt = await bcrypt.genSalt();
     const hashedPassword = await bcrypt.hash(addMe.password, salt);
     addMe.password = hashedPassword;
     let result = await User.create(addMe);
 
     if (result instanceof User) {
       console.log('User Created!');
       const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, {
         expiresIn: '6hr',
       });
       return token;
     }
     return constants.U_CREATION_FAILURE;
   } catch (err) {
     return err;
   }
 };
 
 /**
  * This function takes in an email and attempts to search the database for the user with that email
  *
  * @param {String} email the email of the user to be searched for
  * @returns {JSON} the JSON object of the user
  */
 exports.getUserByEmail = async function (email) {
   result = await User.find({ email: email }).select('-password');
 
   return result;
 };
 
 /**
  * This function takes in an email and attempts to search the database for the user with that email
  *
  * @param {String} email the email of the user to be searched for
  * @returns {JSON} the JSON object of the user
  */
 exports.getUserById = async function (id) {
   try {
     result = await User.findOne({ _id: id }).select('-password');
     return result;
   } catch (err) {
     return err;
   }
 };
 
 /**
  * This function takes in an email and a password and attempts to log in the user
  * corresponding to them.
  *
  * @param {String} user.email the email of the user to be logged in
  * @param {String} user.password the hashed password of the user
  * @returns {String} the string response
  */
 exports.login = async function (user) {
   try {
     let match = await User.findOne({ email: user.email });
     if (match === null) {
       return constants.U_INVALID_CREDENTIALS;
     }
     if (await bcrypt.compare(user.password, match.password)) {
       const token = jwt.sign({ id: match._id }, process.env.JWT_SECRET, {
         expiresIn: '6hr',
       });
       return token;
     } else {
       return constants.U_INVALID_CREDENTIALS;
     }
   } catch (err) {
     console.log(err);
     return err;
   }

 };