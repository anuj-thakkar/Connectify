import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRegisteredUserEntries } from '../services/usersService';

const ListAllConnections = () => {
  const [entries, setEntries] = useState();
    useEffect(() => {
        const fetchEntries = async () => {
        const fetchedEntries = await getRegisteredUserEntries();
        setEntries(fetchedEntries);
        }
        fetchEntries();
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
                <td>{entry.username}</td>
            </tr>
            ))}
            </tbody>
        </table>
        </div>
    ) 
};
export default ListAllConnections;