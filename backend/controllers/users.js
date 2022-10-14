const userRouter = require('express').Router();
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
  const auth = req.currentUser;
  if (auth) {
    const users = await User.find({});
    return res.json(users.map((users) => users.toJSON()));
  }
  return res.status(403).send('Not authorized');
});

userRouter.post('/', (req, res) => {
  const user = new User(req.body);
  const savedUser = user.save();
  return res.status(201).json(savedUser);
});

module.exports = userRouter;