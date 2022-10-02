import React, { useState } from 'react';
import fire from '../fire.js';
import logo from './logo.jpg';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const handleLogin = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(email, password)
          .catch((error) => {
            console.error('Incorrect username or password');
        });
    }

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
                <div class="loginDiv">
                    <h1 class="loginHdr">Login</h1>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            onChange={({ target }) =>     
                            setEmail(target.value)}
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
                        <button type="submit">
                            Sign in
                        </button>
                    </form>
                </div>
                <div class="registerDiv">
                    <h1>Register</h1>
                    <form onSubmit={handleRegister}>
                        <input
                            type="text"
                            onChange={({ target }) =>     
                            setEmail(target.value)}
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
                        <button type="reg">
                            Register
                        </button>
                    </form>
                </div>
        </div>
    )
};

export default Login
