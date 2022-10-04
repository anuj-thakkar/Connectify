/**
 * @fileoverview This file routes all requests to a specific function
 */

/**
 * import all libraries we need for this file
 */
 var express = require('express');
 var userRouter = express.Router();
 const path = require('path');
 
 const constants = require('../constants');
 
 /**
  * require jsonwebtoken for authentication
  */
 const jwt = require('jsonwebtoken');
 
 /**
  * require auth.js for the jwt authentication function
  */
 const auth = require('../auth/auth.js');
 
 /**
  * import the userService file and all functions included inside of it
  */
 const userService = require(path.resolve(
   __dirname,
   '../Services/userService.js'
 ));
 
 const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require('constants');
 
 /**
  * allow post to access json
  */
 userRouter.use(express.json());
 
 /**
  * endpoint for getting json of all users from database
  */
 userRouter.get('/users', async function (req, res) {
   const users = await User.find({});
   res.json(users);
 });
 
 /**
  * endpoint for getting a user by their id
  */
 userRouter.get('/users/id/:id', auth.authenticateJWT, async function (req, res) {
   let id = req.params.id;
   let result = await userService.getUserById(id);
   if (result instanceof Error) {
     res.status(400).send(result.message);
   } else {
     res.status(200).send(result);
   }
 });
 
 /**
  * endpoint for updating database of users
  */
 userRouter.post('/users/signup', async function (req, res) {
   let result = await userService.addUser(req.body);
   if (result === constants.U_CREATION_FAILURE) {
     res.status(500).send(result);
   } else if (result === constants.U_EMAIL_TAKEN) {
     res.status(409).send(result);
   } else if (result instanceof Error) {
     res.status(400).send(result.message);
   } else {
     res.status(200).send(result);
   }
 });
 
 /**
  * endpoint for logging in / comparing user credentials
  */
 userRouter.post('/users/login', async function (req, res) {
   let result = await userService.login(req.body);
   if (result === constants.U_INVALID_CREDENTIALS) {
     res.status(401).send(result);
   } else if (result instanceof Error) {
     // console.log(result);
     res.status(400).send(result.message);
   } else {
     res.status(200).send(result);
     // console.log(result)
   }
 });
 
 /**
  * allows index.js to access this file
  */
 module.exports = userRouter;