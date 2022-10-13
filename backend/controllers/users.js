const userRouter = require('express').Router();
const User = require('../models/user')
const express = require("express");
const fs = require('fs');

const app = express();

// module required to change User profile picture 
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


userRouter.get('/', (req, res) => {
  return res.send('user router GET'); 
});

userRouter.post('/', (req, res) => {
  const user = new User(req.body);
  const savedUser = user.save();
  return res.status(201).json(savedUser);
});

// making the folder static to be accessed on frontend
// creates endpoint for the image
app.use(express.static('./uploads'));

app.get("/home/settings", upload.single("avatar"), (req, res) => {
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
