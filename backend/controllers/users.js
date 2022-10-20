const userRouter = require('express').Router();
const { Router } = require('express');
const { useParams } = require('react-router-dom');
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
  const auth = req.currentUser;
  if (auth) {
    const users = await User.find({});
    return res.json(users.map((users) => users.toJSON()));
  }
  return res.status(403).send('Not authorized');
});

userRouter.get('/search', async(req, res) => {
  // return req;
  // const auth = req.currentUser;
  // if (auth) {
    console.log(req.username);
    const users = await User.find({username:req.username});
    return res.json(users.map((users) => users.toJSON()));
  // }
  // return res.status(403).send('Not authorized');
});

userRouter.post('/', (req, res) => {
  const user = new User(req.body);
  const savedUser = user.save();
  return res.status(201).json(savedUser);
});

userRouter.post('/updateEmail', async (req, res) => {
  var params = req.body;
  User.findOne({'email':params.email}, function(err,user) {
    if (err) {
      console.log(err);
      return res.status(400).send('Error updating email');
    } else {
      user.email = params.email;
      User.findOne({email: params.email}, function(err, existingUser) {
        if(err) return next(err);
        if(existingUser) {
          return res.status(404).send('Account with that email already exists.');
        } else {
          User.updateOne({"_id":params._id},params, function(err, user) {
            if (err) return next(err);
            return res.status(200).send('Email address updated Successfully.');
          });
        }
      });      
    }
  });
});

userRouter.post('/updateBio', async (req, res) => {
  var params = req.body;
  User.findOne({'email':params.email}, function(err,user) {
    if (err) {
      console.log(err);
      return res.status(400).send('Error updating bio');
    } else {
      user.bio = params.bio;
      User.updateOne({"email":params.email},params, function(err, user) {
        if (err) return next(err);
        return res.status(200).send('Bio updated Successfully.');
      });
    }
  });
});


userRouter.post('/updateProfilePicture', async (req, res) => {

  // TODO: Update profile picture
});
  




module.exports = userRouter;