import React, { useState } from 'react';
import fire from '../fire.js';
import { registerUser } from '../services/usersService'

const Register = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();


    const handleRegister = (e) => {
        e.preventDefault();
        if (email && password && firstName && lastName) {
          registerUser(firstName, lastName, email, password);
        }
      
        fire.auth().createUserWithEmailAndPassword(email, password)
          .catch((error) => {
            console.error('Unable to Register');
            console.log(email, password);
        });
        
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
                <label>First Name</label>
                <input
                  type="fName"
                  className="form-control mt-1"
                  onChange={({ target }) =>     
                  setFirstName(target.value)}
                  placeholder="First Name"
                />
                </div>
                <div className="form-group mt-3">
                <label>Last Name</label>
                <input
                  type="lName"
                  className="form-control mt-1"
                  onChange={({ target }) =>     
                  setLastName(target.value)}
                  placeholder="Last Name"
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
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  onChange={({ target}) => 
                  setPassword(target.value)}
                  placeholder="Confirm password"
                />
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
