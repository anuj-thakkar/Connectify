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
  const auth = req.currentUser;
  if (auth) {
    const users = await User.find({});
    return res.json(users.map((users) => users.toJSON()));
  }
  return res.status(403).send('Not authorized');
});

/**
 * This gets a user from search bar
 */
userRouter.get('/search', async(req, res) => {
    let userPattern = new RegExp("^" + req.body.query);
    User.find({email: {$regex: userPattern}})
    .select("username email")
    .then(user => {
      res.json({user})
    })
    .catch(err => {
      console.log(err);
    })

    console.log(req.username);
    const users = await User.find({username:req.username});
    return res.json(users.map((users) => users.toJSON()));
  // }
  // return res.status(403).send('Not authorized');
});

userRouter.post('/register', async (req, res) => {
  const user = await new User(req.body);
  const savedUser = user.save();
  return res.status(201).json(savedUser);
});


// endpoint to updateEmail
userRouter.post('/updateEmail', async (req, res) => {
  var params = req.body;
  res.send('update email');
  User.findOne({'email':params.email}, function(err,existingUser) {
    user.email = params.email;
      if(err) return next(err);
      if(existingUser) {
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
userRouter.post('/updateUsername', async (req, res) => {
  var params = req.body;
 
  User.findOne({'username':params.username}, function(err,user) {
    if (err) {
      console.log(err);
      return res.status(400).send('Error updating username');
    } 
    if (user) {
      return res.status(400).send('Username already exists');
    } else {
      user.username = params.username;
      User.updateOne({"username":params.username},params, function(err, user) {
        if (err) return next(err);
        return res.status(200).send('Username updated Successfully.');
      });
    }
  });
});


//follow a user
userRouter.put("/:username/follow", async (req, res) => {
  if (req.body.username !== req.params.username) {
    try {
      const user = await User.findById(req.params.username);
      const currentUser = await User.findById(req.body.username);
      if (!user.followers.includes(req.body.username)) {
        await user.updateOne({ $push: { followers: req.body.username } });
        await currentUser.updateOne({ $push: { followings: req.params.username } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user
userRouter.put("/:username/unfollow", async (req, res) => {
    if (req.body.username !== req.params.username) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.username)) {
          await user.updateOne({ $pull: { followers: req.body.username } });
          await currentUser.updateOne({ $pull: { followings: req.params.username } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  });


module.exports = userRouter;