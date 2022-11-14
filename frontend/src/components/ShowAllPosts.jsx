import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRegisteredUserEntries, searchForUsers } from '../services/postsService';

const ShowAllPosts = () => {
  const [entries, setEntries] = useState();
    useEffect(() => {
        
        // Using the Request Config
        axios({
            method: "get",
            url: "https://localhost:3001/api/allposts",
        }).then(function (response) {
            console.log(response.data);
        });

    }, [])
    if (entries === undefined) {
        return null;
    }
    return (
        <div>
        <h2>Connections</h2>
        
        <table style={{textAlign:"center"}}>
            <thead>
            <tr>
                <th>Username</th>
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
export default ListAllConnections;