const userRouter = require('express').Router();
const User = require('../models/user')

userRouter.get('/', (req, res) => {
  return res.send('user router GET'); 
});

userRouter.post('/', (req, res) => {
  const user = new User(req.body);
  const savedUser = user.save();
  return res.status(201).json(savedUser);
});

module.exports = userRouter;