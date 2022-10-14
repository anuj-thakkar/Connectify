import { Navigate, useNavigate } from 'react-router-dom';
import {SettingsPane, SettingsPage, SettingsContent, SettingsMenu} from 'react-settings-pane';
import logo from './logo.jpg';
import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import "../App.css";
import fire from '../fire.js';

const Settings = () => {
  const [isError, setConfirmPassError] = useState("");
  const [requirements, setRequirements] = useState("");
    
     let settings = {
       'mysettings.general.name': 'Bob Jones',
       'mysettings.general.email': 'bobjones@gmail.com',
       'mysettings.general.bio': 'livin life',
     };
    
     function comparePasswords() {
      if (document.getElementById('newPass').value != document.getElementById('confirmNewPass').value) {
        setConfirmPassError("Passwords do not match!");
      } else {
        fire.auth().currentUser.updatePassword(document.getElementById('newPass').value).then(function() {
          setConfirmPassError("Password successfully changed!");
        }).catch(function(error) {
          setConfirmPassError(error.message);
        });
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

    
     return (     
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
                 <input type="text" onKeyUp={checkRequirements} className="form-control" name="mysettings.general.password" placeholder="Enter new password" id="newPass" />
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
                 <input type="text" onKeyUp={comparePasswords} className="form-control" name="mysettings.general.confirmPassword" placeholder="Re-enter new password" id="confirmNewPass" />
               </fieldset>

               <p style={{color: "red"}} >  
                  {isError} </p>
                  <p style={{color: "red"}} >  
                  {requirements} </p>

              
               <Link to="/home" className="btn btn-primary">Save</Link>
               <Link to="/home" className="btn btn-primary">Cancel</Link>
            </div>
          </form>
        
     )
};

export default Settings