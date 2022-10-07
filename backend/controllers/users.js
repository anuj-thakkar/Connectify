const userRouter = require('express').Router();

userRouter.get('/', (req, res) => {
  return res.send('user router GET'); 
});

userRouter.post('/', (req, res) => {
  return res.send('user router POST');
});

module.exports = userRouter;