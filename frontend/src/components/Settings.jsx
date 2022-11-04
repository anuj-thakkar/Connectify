import { Navigate, useNavigate } from 'react-router-dom';
import logo from '../static/logo.jpg';
import { Link } from 'react-router-dom'
import { MdHomeFilled, MdBuild, MdAccountCircle, MdSearch, MdCompareArrows } from "react-icons/md";
import React, { useState } from 'react';
import "../App.css";
import fire from '../fire.js';

import { useStateProvider } from "../utils/StateProvider";

import { 
  getAuth, 
  deleteUser,
} from "firebase/auth";

const Settings = () => {
  const [isError, setConfirmPassError] = useState("");
  const [requirements, setRequirements] = useState("");
  const [{ token}] = useStateProvider();
    

  let settings = {
    'mysettings.general.name': localStorage.getItem('username'),
    'mysettings.general.email': localStorage.getItem('email'),
    'mysettings.general.bio': localStorage.getItem('bio'),
    'mysettings.general.favSong': localStorage.getItem('FavSong')
  };

  const signOut = () => {
    fire.auth().signOut();
  };

  function comparePasswords() {
    if (document.getElementById('newPass').value !== document.getElementById('confirmNewPass').value) {
      setConfirmPassError("Passwords do not match!");
    } else {
      setConfirmPassError("");
    }
  }

  function checkRequirements() {
    var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

    if (!regex.test(document.getElementById('newPass').value)) {
      setRequirements("Password does not meet requirements!");
    } else {
      setRequirements("");
    }

  }

  function deleteSignedUser() {

    if (window.confirm('Are you sure you want to delete your account? \n This action cannot be undone.')) {

    deleteUser(getAuth().currentUser).then(function () {
      window.location.href = "/";
    }).catch(function (error) {
      console.log(error.message);
    }
    );
  }
  }

  function updateInfo(e) {
    e.preventDefault();
    if (document.getElementById('newPass').value !== "") {
      if (document.getElementById('newPass').value === document.getElementById('confirmNewPass').value) {
        if (document.getElementById('newPass').value !== localStorage.getItem('password')) {
          fire.auth().currentUser.updatePassword(document.getElementById('newPass').value).then(function () {
            setConfirmPassError("Password successfully changed!");
          }).catch(function (error) {
            setConfirmPassError(error.message);
          });
        } else {
          setConfirmPassError("New password cannot be the same as old");
        }
      }
    }
    if (document.getElementById('general.username').value !== localStorage.getItem('username')) {
      window.localStorage.setItem('username', document.getElementById('general.username').value);
      setConfirmPassError("Username sucessfully changed");
    }

    if (document.getElementById('general.email').value !== localStorage.getItem('email')) {
      fire.auth().currentUser.updateEmail(document.getElementById('general.email').value).then(function () {
        window.localStorage.setItem('email', document.getElementById('general.email').value)
        setConfirmPassError("Email successfully changed!");
      }).catch(function (error) {
        setConfirmPassError(error.message);
      });
    }
    if (document.getElementById('profileSong').value !== localStorage.getItem('FavSong')) {
      window.localStorage.setItem("FavSong", document.getElementById('profileSong').value);
      setConfirmPassError("Favorite Song Sucessfully Changed");
    }
    if (document.getElementById('general.bio').value !== localStorage.getItem('bio')) {
      window.localStorage.setItem('bio', document.getElementById('general.bio').value);
      setConfirmPassError("Bio Successfully Changed");
    }
  }


  return (
    <div class="grid-container">
      <div class="itemnav">
        <nav class="navbar navbar-expand-lg navbar-dark bg-black">
          <div class="container-fluid">
            <a class="navbar-brand" href="#"><img src={logo} alt="" padding-left="10" height="60" class="d-inline-block align-text-top"></img></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                &nbsp;
                &nbsp;
                &nbsp;
                <a class="nav-link active" aria-current="page" href={`/home#access_token=${token}&token_type=Bearer&expires_in=3600`}><MdHomeFilled/> Home</a>

                &nbsp;
                &nbsp;
                &nbsp;
                <a class="nav-link active" aria-current="page" onClick={Settings} href="/home/settings"><MdBuild /> Settings</a>
                &nbsp;
                &nbsp;
                &nbsp;
                <a class="nav-link active" aria-current="page" href={`../profile#access_token=${token}&token_type=Bearer&expires_in=3600`}><MdAccountCircle/> Profile</a>
                &nbsp;
                &nbsp;
                &nbsp;
                <a class="nav-link active" aria-current="page" onClick={signOut} href="/#"><MdCompareArrows /> Sign out</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="itemleft">
        <form>
          <div className='settingsForm' align="left">
            <fieldset className="form-group">
              <label for="profileName" style={{ color: 'white' }}>Username: </label>
              <input type="text" className="form-control" name="mysettings.general.name" placeholder="Name" id="general.username" defaultValue={settings['mysettings.general.name']} />
            </fieldset>

            <fieldset className="form-group">
              <label for="profileEmail" style={{ color: 'white' }}>Email Address: </label>
              <input type="text" className="form-control" name="mysettings.general.email" placeholder="Email Address" id="general.email" defaultValue={settings['mysettings.general.email']} />
            </fieldset>

            <fieldset className="form-group">
              <label for="profilePassword" style={{ color: 'white' }}>New Password: </label>
              <input type="text" onKeyUp={checkRequirements} onKeyDown={comparePasswords} className="form-control" name="mysettings.general.password" placeholder="Enter new password" id="newPass" data-testid="newPass" />
            </fieldset>

            <label style={{ color: 'white', paddingLeft: '20px' }}>Password Requirements</label>
            <ul style={{ color: 'white', fontSize: '15px' }}>
              <li>At least 8 characters</li>
              <li>At least 1 letter</li>
              <li>At least 1 number</li>
              <li>At least 1 special character</li>
            </ul>
              
            <fieldset className="form-group">
              <label for="profilePassword" style={{ color: 'white' }}>Confirm Password: </label>
              <input type="text" onKeyUp={comparePasswords} onKeyDown={checkRequirements} className="form-control" name="mysettings.general.confirmPassword" placeholder="Re-enter new password" id="confirmNewPass" />
            </fieldset>
            
            <p style={{ color: "red"}} >
              {isError} </p>
            <p style={{ color: "red" }} >
              {requirements} </p>
            <fieldset className="form-group">
              <label for="profileBio" style={{ color: 'white' }}>Bio: </label>
              <input type="text" className="form-control" name="mysettings.general.bio" placeholder="Bio" id="general.bio" defaultValue={settings['mysettings.general.bio']} />
            </fieldset>

            <fieldset className="form-group">
              <label for="profileFavSong" style={{ color: 'white'}}>Fav Song of All Time: </label>
              <input type="text" className="form-control" placeholder="Fav Song of All Time" id="profileSong" defaultValue={settings['mysettings.general.favSong']} />
            </fieldset>  

            <div class="form-group" style={{paddingTop: "20px"}}>
              <Link to="/home" className="btn btn-outline-danger">Cancel</Link>
              &nbsp;
              <button to="/home" className="btn btn-success" onClick={(e) => {updateInfo(e)}}>Save</button>
              &nbsp;
              <button className="btn btn-danger" id="delete" onClick={deleteSignedUser}>Delete Account</button>
            </div>

            </div>
            </form>
            
          </div>
        
      </div>
      
  
  
    

    //rama old code below:
    /*
    <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Settings</h3>
            <div className="form-group mt-3">
              <label>Profile Name</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter name"
              />
            </div>
            <div className="form-group mt-3">
              <label>Bio</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter bio"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email Address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Change Password</label>
              <input
                id="newPass"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="form-group mt-3">
              <label>Confirm Password</label>
              <ul class="passList">
                <li>At least 8 characters</li>
                <li>At least 1 letter</li>
                <li>At least 1 number</li>
                <li>At least 1 special character</li>
              </ul>
              <input
                className="form-control mt-1"
                onKeyUp={comparePasswords}
                onKeyDown={checkRequirements} 
                placeholder="Re-enter password" 
                id="confirmNewPass"
              />
            </div>
            <p style={{color: "red"}} >  
                {isError} 
            </p>
            <p style={{color: "red"}} >  
                {requirements} 
            </p>
            <div className="d-grid gap-2 mt-3">
            <Link to="/home" className="btn btn-success">Save</Link>
            <Link to="/home" className="btn btn-danger">Cancel</Link>
            </div>
            
          </div>
        </form>
        </div>
        */

    //ishan code below
    /*  
  <form> 
    <div>
      <a  href="#"><img src={logo} alt="" class="settingsLogo" align="left" height="auto" width="auto"></img></a>
      </div>

      &nbsp;
      <div className='settingsForm' align='left' height="auto" width="auto">
           <fieldset className="form-group">
             <label for="profileName" style={{color : 'white'}}>Name: </label>
             <input type="text"  className="form-control" name="mysettings.general.name" placeholder="Name" id="general.ame" defaultValue={settings['mysettings.general.name']} />
           </fieldset>

           <fieldset className="form-group">
           <label for="profileBio" style={{color : 'white'}}>Bio: </label>
             <input type="text" className="form-control" name="mysettings.general.bio" placeholder="Bio" id="general.bio" defaultValue={settings['mysettings.general.bio']} />
           </fieldset>

           <fieldset className="form-group">
           <label for="profileEmail" style={{color : 'white'}}>Email Address: </label>
             <input type="text" className="form-control" name="mysettings.general.email" placeholder="Email Address" id="general.em" defaultValue={settings['mysettings.general.email']} />
           </fieldset>

           <fieldset className="form-group">
           <label for="profilePassword" style={{color : 'white'}}>New Password: </label>
             <input type="text" onKeyUp={checkRequirements} onKeyDown={comparePasswords} className="form-control" name="mysettings.general.password" placeholder="Enter new password" id="newPass" />
           </fieldset>

          &nbsp;
           <label class="labelPass">Password Requirements</label>
            <ul class="passList">
              <li>At least 8 characters</li>
              <li>At least 1 letter</li>
              <li>At least 1 number</li>
              <li>At least 1 special character</li>
            </ul>

           <fieldset className="form-group">
           <label for="profilePassword" style={{color : 'white'}}>Confirm Password: </label>
             <input type="text" onKeyUp={comparePasswords} onKeyDown={checkRequirements} className="form-control" name="mysettings.general.confirmPassword" placeholder="Re-enter new password" id="confirmNewPass" />
           </fieldset>

           <p style={{color: "red"}} >  
              {isError} </p>
              <p style={{color: "red"}} >  
              {requirements} </p>

          
           <Link to="/home" className="btn btn-success">Save</Link>
           <Link to="/home" className="btn btn-success">Cancel</Link>
        </div>
      </form>
    */
  )
};

export default Settings