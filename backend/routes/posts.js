/**
 * @fileoverview This file holds all endpoints to handle creation and modification of posts
 * a user can create a post, like a post, unlike a post, comment on a post, and delete a post
 * @todo test endpoints and make changes, this is just a brief structure
 */

const express = require('express')
const postRouter = express.Router()
const mongoose = require('mongoose')
//const requireLogin  = require('../middleware/requireLogin')
const Post =  require('../models/Posts')

// view all pots
postRouter.get('/allposts',(req,res) => {
    Post.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
    
});

postRouter.get('/', async (req, res) => {
    // const auth = req.currentUser;
    // if (auth) {
    const posts = await Post.find({}).sort({createdAt:-1}).limit(20);
    return res.json(posts.map((posts) => posts.toJSON()));
    // }
    // return res.status(403).send('Not authorized');
});


// postRouter.post('/createPost', (req, res)=>{
//     const title  = req.body.title; 
//     const username = req.body.username;
//     const body = req.body.body;
//     if(!title || !body){
//       return  res.status(422).json({error:"Plase add all the fields"})
//     }
//     const user = 
//     const post = new Post({
//         title,
//         body,
//         postedBy:username
//     })
//     post.save().then(result=>{
//         res.json({post:result})
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })

postRouter.post('/createPost', async (req, res) => {
    console.log(req.body);
    const post = await new Post(req.body);
    const savedPost = post.save();
    return res.status(201).json(savedPost);
  });

// list all posts of a user
postRouter.get('/mypost',(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("PostedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

postRouter.put('/like',(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
postRouter.put('/unlike',(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


postRouter.put('/comment',(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

postRouter.delete('/deletepost/:postId',(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})

module.exports = postRouter