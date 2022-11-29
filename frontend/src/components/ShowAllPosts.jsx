import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ShowAllPosts = () => {
    const [data,setData] = useState([])
    
    useEffect(() => {
        
        // Using the Request Config
        axios({
            method: "get",
            url: "https://localhost:3001/api/allposts",
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts)
        })
     },[])
    
    return (
        <div>
        <h2>Posts</h2>
        
        </div>
    ) 
};
export default ShowAllPosts;