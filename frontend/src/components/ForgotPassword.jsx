import React, { useState } from 'react';
import fire from '../fire.js';

const ForgotPassword = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [emailValue, setEmailValue] = useState('');


    return success ? (
        <div className="content-container">
            <h1>Success</h1>
            <p>Please check your email for the reset link</p>
        </div>
    ) : (
        <div className="content-container">
            <h1>Forgot Password</h1>
            <p>Enter your email and we'll send you a reset link</p>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)} 
                placeholder="someone@gmail.com" />
            <button
                disabled={!emailValue}
            >Send Reset link</button>
        </div>
    )
};

export default ForgotPassword
