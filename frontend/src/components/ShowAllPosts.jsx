import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, deletePost, likePost } from '../services/usersService';
import "../App.css";
import {MdOutlineFavorite, MdOutlineFavoriteBorder} from 'react-icons/md';

const ShowAllPosts = () => {
    const [like, setLike] = useState(0);
    const [entries, setEntries] = useState();
    useEffect(() => {
        const fetchEntries = async () => {
            const fetchedEntries = await getPosts();
            setEntries(fetchedEntries);
        }
        fetchEntries();
    }, [])
    if (entries === undefined) {
        return null;
    }

    const deleteUserPost = (postId) => {
        deletePost(postId);
    } 

    const updateLikes = (postId) => {
        likePost(postId);
    }

    return (
        <div align="left">
            {entries.map((entry) => (
                <div class="border border-success" style={{ marginLeft: "15px", marginRight: "15px", marginTop: "15px", marginBottom: "15px", color: "black", borderRadius: "15px" }}>
                    <label class="text-white" style={{ fontSize: "20px", marginLeft: "15px", marginTop: "15px", marginBottom: "15px", align: "start" }}>{entry.postedBy}</label>
                    &nbsp; &nbsp;
                    <label class="text-white" style={{ fontSize: "20px", marginTop: "15px", marginBottom: "15px", marginRight: "30px", textColor: "white" }}>{entry.text}</label>
                    <label class="text-white" onClick={()=>updateLikes(entry.id)} style={{ fontSize: "20px" }}>
                    {entry.likes !== 0 ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder/>}
                    &nbsp; &nbsp;
                    {entry.likes}
                    &nbsp; &nbsp;
                    </label>
                    <label> {window.localStorage.getItem('username') === entry.postedBy ? 
                    <label class="btn btn-outline-danger" onClick={()=>deleteUserPost(entry.id)}>Delete Post</label> : null} </label>
                </div>
            ))}
        </div>
    )
};

export default ShowAllPosts;

/*
<div>
        <table style={{textAlign:"center"}}>
            <thead>
            <tr>
                <th>Username</th>
                <th>Title</th>
                <th>Text</th>
            </tr>
            </thead>
            <tbody>
            {entries.map((entry) => (
            <tr>
                <td> {entry.postedBy}</td>
                <td key={entry.id}>{entry.title}</td>
                <td>{entry.text}</td>
            </tr>
            ))}
            </tbody>
        </table>
        </div>
*/