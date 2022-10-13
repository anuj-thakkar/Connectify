const userRouter = require('express').Router();
const User = require('../models/user')
const express = require("express");

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

app.get("/upload", upload.single("avatar"), (req, res) => {
  console.log(req.file);  
  res.send("File uploaded successfully.");
  res.send("200")

});
