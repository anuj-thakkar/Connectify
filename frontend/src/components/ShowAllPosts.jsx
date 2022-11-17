import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRegisteredUserEntries, searchForUsers } from '../services/postsService';

const ShowAllPosts = () => {
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    
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
        
        <table style={{textAlign:"center"}}>
            <thead>
            <tr>
                <th>Posts</th>
            </tr>
            </thead>
            <tbody>
            {entries.map((entry) => (
            <tr>
                <td key={entry.id}>{entry.username}</td>
            </tr>
            ))}
            </tbody>
        </table>
        </div>
    ) 
};
export default ShowAllPosts;