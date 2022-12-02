const express = require("express");
const cors = require('cors');
const usersRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const mongoose = require('mongoose');
const { request } = require('express');
const decodedToken = require('./authenticateToken')


mongoose.connect(
    'mongodb+srv://admin:connectify@connectify.vdzw2bf.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => {
       console.log('Connected to MongoDB');
     })
     .catch((err) => {
       console.log('Error connecting to MongoDB', err.message);
     });


const app = express();


app.use(cors());
app.use(decodedToken);
app.use(express.json());
app.use('/api', usersRouter);
app.use('/posts', postRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});