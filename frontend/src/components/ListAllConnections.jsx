import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRegisteredUserEntries, searchForUsers } from '../services/usersService';

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
        <br></br>
        <table style={{textAlign:"left"}}>
            <thead>
            <tr>
                <th><h3>Registered Users</h3></th>
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