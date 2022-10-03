import React, { useState } from 'react';
import fire from '../fire.js';
import { Link } from 'react-router-dom';

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

    return (
            <div class="logoDiv">
                <div class="loginDiv">
                    <h1 class="loginHdr">Login</h1>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
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
                <div class="forgotPassword">
                        <Link to="/forgotPassword">
                            <button type="reg">
                                Forgot Password?
                            </button>
                        </Link>
                </div>
                <div class="registerDiv">
                    <h1>Don't have an account? </h1>
                        <Link to="/register">
                            <button type="reg">
                                Register here!
                            </button>
                        </Link>
                </div>
        </div>
    )
};

export default Login
