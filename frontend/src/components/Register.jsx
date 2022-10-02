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
            <div class="loginDiv">
                <h1 class="loginHdr">Login</h1>
            </div>
        </div>
    )
};

export default Register
