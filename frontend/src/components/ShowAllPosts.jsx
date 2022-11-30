import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/usersService';

const ShowAllPosts = () => {
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
    return (
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
    ) 
};

export default ShowAllPosts;