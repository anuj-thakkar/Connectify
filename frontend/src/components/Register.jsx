import React, { useState } from 'react';
import fire from '../fire.js';
import { registerUser, registerWithChat } from '../services/usersService'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isError, setConfirmPassError] = useState("");
    const [requirements, setRequirements] = useState("");
    const navigate = useNavigate();

    const [isShown, setIsSHown] = useState(false);

    const togglePassword = () => {
      setIsSHown((isShown) => !isShown);
    };

    function comparePasswords() {
      if (document.getElementById('pass').value != document.getElementById('confirmPass').value) {
        setConfirmPassError("Passwords do not match!");
      } else {
        setConfirmPassError("");
      }
     }

    function checkRequirements() {
      var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

      if (!regex.test(document.getElementById('pass').value)) {
        setRequirements("Password does not meet requirements!");
      } else {
        setRequirements("");
      }
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if (email && password && confirmPassword) {
          fire.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
              try {
                fire.auth().currentUser.sendEmailVerification();
                registerUser(username, name, email);
                registerWithChat(username, password);
                console.log("Verification Sent");
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);
                localStorage.setItem('name', name);
                localStorage.setItem('username', username);
                localStorage.setItem('bio', " ");
                navigate('/link');
              } catch (error) {
                console.log(error);
              }
              
            })
            .catch((error) => {
              console.error(error);

              console.log(email, password);
          });
        } else {
          alert("Please fill in all fields");
        }
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
                  type={isShown ? "text" : "password"}
                  id="pass"
                  className="form-control mt-1"
                  onKeyUp={checkRequirements}
                  onKeyDown={comparePasswords}
                  onChange={({ target}) => 
                  setPassword(target.value)}
                  placeholder="Create a password"
                />
                <label title="At least 8 characters&#10;At least 1 letter&#10;At least 1 number&#10;At least 1 special character">Password Requirements</label>
              
              </div>
              <div className="form-group mt-3">
                <label>Confirm Password</label>
                <input
                  value={confirmPassword}
                  type={isShown ? "text" : "password"}
                  id="confirmPass"
                  className="form-control mt-1"
                  onKeyUp={comparePasswords}
                  onKeyDown={checkRequirements}
                  onChange = {(e) => checkValidation(e)}
                  name = "confirmPassword"
                  placeholder="Confirm password"
                />

<label htmlFor="checkbox">Show passwords?</label>
          &nbsp;
          <input
            id="checkbox"
            type="checkbox"
            checked={isShown}
            onChange={togglePassword}
            />

                <p style={{color: "red"}} >  
                  {isError} </p>
                  <p style={{color: "red"}} >  
                  {requirements} </p>

                  <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-success">
                  Register
                </button>
              </div>
              </div>
              
              <p></p>
            </div>
          </form>
        </div>
      )
    
};

export default Register
