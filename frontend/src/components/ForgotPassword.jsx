import React, { useState } from 'react';
import fire from '../fire.js';

const ForgotPassword = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [emailValue, setEmailValue] = useState('');

    const handlePasswordReset = (e) => {
        e.preventDefault();
        
        fire.auth().sendPasswordResetEmail(emailValue)
        return setSuccess(true);
    }

    return success ? (
        <div className="content-container">
            <h1>Success</h1>
            <p>Please check your email for the reset link</p>
        </div>
    ) : (
        <div className="Auth-form-container">
            <form className="Auth-form">
            <div className="Auth-form-content">
            <h3 className="Auth-form-title">Forgot Password?</h3>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                type="email"
                className="form-control mt-1"
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)} 
                onSubmit={e => handlePasswordReset(e)}
                placeholder="someone@gmail.com" 
            />
            <p></p>
            <div className="d-grid gap-2 mt-3">
            <button class="btn btn-success"
                disabled={!emailValue}
                onClick={handlePasswordReset}
            >Send Reset Link</button>
            </div>
            </div>
            </form>
        </div>
    )
};

export default ForgotPassword
