/**
 * @fileoverview This file holds all endpoints to handle creation and modification of users
 */

const userRouter = require('express').Router();
const { express } = require('express');
// const { useParams } = require('react-router-dom');
const User = require('../models/user')

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

/*
* This gets all users from the database
*/
userRouter.get('/', async (req, res) => {
  // const auth = req.currentUser;
  // if (auth) {
    const users = await User.find({});
    return res.json(users.map((users) => users.toJSON()));
  // }
  // return res.status(403).send('Not authorized');
});

userRouter.post('/userInfo', jsonParser, async (req, res) => {
  var user = await User.findOne({
    "username": req.body.username
  });
  console.log(req.body.username);
  console.log(user);
  if (user) {
    console.log(user.toJSON());
    return res.json(user.toJSON());
  } else {
    console.log("failed");
    return res.status(404).send('user not found');
  }
});

userRouter.post('/register', async (req, res) => {
  const user = await new User(req.body);
  const savedUser = user.save();
  return res.status(201).json(savedUser);
});


// endpoint to updateEmail
userRouter.post('/updateEmail', jsonParser, async (req, res) => {
  User.findOne({'email':req.body.email}, function(err , existingUser) {
      if (err) return next(err);
      if (existingUser) {
        return res.status(404).send('Account with that email already exists.');
      } else {
        User.updateOne({"email":params.email},params, function(err, user) {
          if (err) return next(err);
          fire.auth.updateEmail(user.email, params.email).then(() => {
            fire.auth.sendEmailVerification(user.email).then(() => {
              return res.status(200).send('Email updated!');
            }).catch((error) => {
              return res.status(404).send('An error occurred');
          }).catch((error) => {
            console.log(error);
          });
          return res.status(200).send('Email address updated successfully.');
          });
        });
      }
  });
});

// endpoint to updateBio
userRouter.post('/updateBio', jsonParser, async (req, res) => {
  User.findOne({'email':req.body.email}, function(err,user) {
    if (err) {
      console.log(err);
      return res.status(400).send('Error updating bio');
    } else {
        User.updateOne({ "email" : req.body.email }, { $set: { "bio" : req.body.bio } }, function(err, user) {
        if (err) return next(err);
        return res.status(200).send('Bio updated Successfully.');
      });
    }
  });
});

userRouter.post('/login', jsonParser, async (req, res) => {
  var user = await User.findOne({'email':req.body.email});
  console.log(req.body.email);
  if (user) {
    console.log(user.toJSON);
    return res.json(user.toJSON());
  } else {
    console.log("failed");
    return res.status(404).send('user not found');
  }
  // const foundUser = User.findOne({'email':req.body.email}, function(err,user) {
  //   if (err) {
  //     console.log(err);
  //     return res.status(400).send('Error logging in');
  //   } else {
  //     c
  //       res.status(200).send("Found it");
  //   }
  // });
});


// endpoint to update profile picture
const fs = require('fs');
const multer = require('multer');
const user = require('../models/user');
const upload = multer({ dest: 'uploads/' })

userRouter.post('/updateProfilePicture', upload.single("avatar"), async (req, res) => {

  let fileType = req.file.mimetype.split("/")[1];
  let fileName = req.file.filename + "." + fileType;

  fs.rename('./uploads/' + req.file.filename, './uploads/' + fileName, (err) => {
    if (err) {
      console.log("File rename error: " + err);
    }
    console.log("callback");
    console.log("File renamed");
  });

  console.log("fileType: ", fileType);
  console.log("req.file", req.file);  
  res.send("File uploaded successfully.");
  res.send("200")

});

// endpoint to update username
// username should not change given that it exists in database
userRouter.post('/updateUsername', jsonParser, async (req, res) => {
  User.findOne({'email':req.body.email}, function(err,user) {
    if (err) {
      return res.status(400).send('Error updating username');
    } 
    if (user) {
      User.findOne({'username':req.body.username}, function(err,user) {
        if (user) {
          return res.status(400).send('Username already exists');
        } else {
          User.updateOne({ "email" : req.body.email }, { $set: { "username" : req.body.username } }, function(err, user) {
            if (err) return next(err);
            console.log(req.body.email, req.body.username);
            return res.status(200).send('Username updated Successfully.');
          });
        }
      });
    } else {
      return res.status(400).send('Cannot find user');
    }
  });
});


//follow a user
userRouter.post("/follow", jsonParser, async (req, res) => {
  console.log(req.body.currentUser, req.body.otherUser);
  const id = await User.findOne({"username":req.body.currentUser})
  const user = await User.findOneAndUpdate({'username':req.body.otherUser}, {$push: {'followers':id.id}});
  await User.findOneAndUpdate({'username':req.body.currentUser}, {$push: {'following':user.id}});
  res.status(200).send(user);
  
});

//unfollow a user
userRouter.post("/unfollow", jsonParser, async (req, res) => {
  console.log(req.body.currentUser, req.body.otherUser);
  const id = await User.findOne({"username":req.body.currentUser})
  const user = await User.findOneAndUpdate({'username':req.body.otherUser}, {$pullAll: {'followers':[id.id]}});
  await User.findOneAndUpdate({'username':id.id}, {$pop: {'followers':user.id}});
  res.status(200).send(user);
  }
);

userRouter.post('/setStatusUpdate', jsonParser, async (req, res) => {
  var params = req.body;
  User.findOne({'email':params.email}, function(err,user) {
    if (err) {
      console.log(err);
      return res.status(400).send('Error updating status');
    } else {
      user.status = params.status;
      User.updateOne({'email':params.email}, {$set: { "statusUpdate" : req.body.status }} , function(err, user) {
        if (err) return next(err);
        return res.status(200).send('Status updated Successfully.');
      });
    }
  });
});

module.exports = userRouter;