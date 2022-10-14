import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchForUsers } from '../services/usersService';

const ListSearchResults = (username) => {
    console.log(username);
  const [entries, setEntries] = useState();
    useEffect(() => {
        const fetchEntries = async () => {
        console.log("List Search Results");
        const fetchedEntries = await searchForUsers(username);
        setEntries(fetchedEntries);
        }
        fetchEntries();
    }, [])
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
                <td>{entry.username}</td>
            </tr>
            ))}
            </tbody>
        </table>
        </div>
    ) 
};
export default ListSearchResults;