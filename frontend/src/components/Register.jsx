import React, { useState } from 'react';
import fire from '../fire.js';
import { registerUser } from '../services/usersService'

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isError, setConfirmPassError] = useState("");


    const handleRegister = (e) => {
        e.preventDefault();
        if (email && password && username && name) {
          registerUser(username, name, email, password);
        }
      
        // fire.auth().createUserWithEmailAndPassword(email, password)
        //   .catch((error) => {
        //     console.error('Unable to Register');
        //     console.log(email, password);
        // });
        
    }

    const checkValidation = (e) => {
      if (password !== confirmPassword) {
        setConfirmPassword(e.target.value);
        setConfirmPassError("Passwords do not match!");
      } else {
        setConfirmPassword(e.target.value);
        setConfirmPassError("");
      }
    }
    return (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleRegister}>
            <div className="Auth-form-content">
            <h3 className="Auth-form-title">Create Account</h3>
            <p className="text-center mt-2">
                <a href="/">Already have an account?</a>
            </p>
                <div className="form-group mt-3">
                <label>Username</label>
                <input
                  type="username"
                  className="form-control mt-1"
                  onChange={({ target }) =>     
                  setUsername(target.value)}
                  placeholder="username"
                />
                </div>
                <div className="form-group mt-3">
                <label>Name</label>
                <input
                  type="Name"
                  className="form-control mt-1"
                  onChange={({ target }) =>     
                  setName(target.value)}
                  placeholder="Name"
                />
                </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  onChange={({ target }) =>     
                  setEmail(target.value)}
                  placeholder="Enter a valid email"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  onChange={({ target}) => 
                  setPassword(target.value)}
                  placeholder="Create a password"
                />
              </div>
              <div className="form-group mt-3">
                <label>Confirm Password</label>
                <input
                  value={confirmPassword}
                  type="password"
                  className="form-control mt-1"
                  onChange = {(e) => checkValidation(e)}
                  name = "confirmPassword"
                  placeholder="Confirm password"
                />
                <p style={{color: "red"}} >  
                  {isError} </p>
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-success">
                  Register
                </button>
              </div>
              <p></p>
            </div>
          </form>
        </div>
      )
};

export default Register
