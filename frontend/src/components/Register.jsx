import React, { useState } from 'react';
import fire from '../fire.js';
import logo from './logo.jpg';

const Register = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();


    const handleRegister = (e) => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(email, password)
          .catch((error) => {
            console.error('Unable to Register');
        });
    }

    return (
            <div class="logoDiv">
            <img src={logo} alt="logo"></img>
            <div class="Register">
                <h1 class="registerHDR"> Enter the following details </h1>
                <form onSubmit={handleLogin}>
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
                        <input
                            type="email"
                            onChange={({ target}) => 
                            setPassword(target.value)}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            onChange={({ target}) => 
                            setPassword(target.value)}
                            placeholder="Password"
                        />
                        <input
                            type="password"
                            onChange={({ target}) => 
                            setPassword(target.value)}
                            placeholder="Confirm Password"
                        />
                        <br />
                        <button type="submit">
                            Sign in
                        </button>
                    </form>
            </div>
        </div>
    )
};

export default Register
