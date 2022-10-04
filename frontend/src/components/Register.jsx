import React, { useState } from 'react';
import fire from '../fire.js';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    const handleRegister = (e) => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(email, password)
          .catch((error) => {
            console.error('Unable to Register');
        });
    }

    return (
            <div class="logoDiv">
            <div class="Register">
                <h1 class="registerHDR"> Enter the following details </h1>
                <form onSubmit={handleRegister}>
                        <input
                            type="text"
                            onChange={({ target }) =>     
                            setEmail(target.value)}
                            placeholder="First Name"
                        />
                        <br />
                        <input
                            type="text"
                            onChange={({ target}) => 
                            setPassword(target.value)}
                            placeholder="Last Name"
                        />
                        <br />
                        <input
                            type="email"
                            onChange={({ target}) => 
                            setPassword(target.value)}
                            placeholder="Email"
                        />
                        <br />
                        <input
                            type="password"
                            onChange={({ target}) => 
                            setPassword(target.value)}
                            placeholder="Password"
                        />
                        <br />
                        <input
                            type="password"
                            onChange={({ target}) => 
                            setPassword(target.value)}
                            placeholder="Confirm Password"
                        />
                        <br />
                        <Link to="/">
                            <button type="return">
                                Go back
                            </button>
                        </Link>
                        <button type="submit">
                            Register
                        </button>
                    </form>
            </div>
        </div>
    )
};

export default Register
