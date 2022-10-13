import {SettingsPane, SettingsPage, SettingsContent, SettingsMenu} from 'react-settings-pane';

const Settings = () => {
    // You will maybe receive your settings from this.props or do a fetch request in your componentWillMount
     //let settings = settings;
    
     let settings = {
       'mysettings.general.name': 'Bob Jones',
       'mysettings.general.email': 'bobjones@gmail.com',
       'mysettings.general.bio': 'livin life',
       'mysettings.general.display-theme': 'Dark mode'
     };
    
     // Define your menu
     const menu = [
       {
         title: 'General',          // Title that is displayed as text in the menu
         url: '/settings/general'  // Identifier (url-slug)
       },
       {
         title: 'Profile',
         url: '/settings/profile'
       }
     ];
    
     // Define one of your Settings pages
     const dynamicOptionsForProfilePage = [
       {
         key: 'mysettings.general.email',
         label: 'E-Mail address',
         type: 'text',
       },
       {
         key: 'mysettings.general.password',
         label: 'Password',
         type: 'password',
       }
     ];
    
     // Save settings after close
     const leavePaneHandler = (wasSaved, newSettings, oldSettings) => {
       // "wasSaved" indicates wheather the pane was just closed or the save button was clicked.
    
       if (wasSaved && newSettings !== oldSettings) {
         // do something with the settings, e.g. save via ajax.
       }
     };
     
     const settingsChanged = (changedSettings) => {
       // this is triggered onChange of the inputs
     };


     const [image, setImage] = useState({});
     const fileOnChange = (e) => {
      console.log(e.target.files[0]);
     }

     const sendImage = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('avater', image);
      console.log(formData);

      axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res.json());
      }).catch(err => {
        console.log(err.json());
      })
     }
    
     // Return your Settings Pane
     return (
        <SettingsPane items={menu} index="/settings/general" settings={settings} onPaneLeave={leavePaneHandler}>
            <SettingsPage handler="/settings/general">
               <fieldset className="form-group">
                 <label for="profileName" style={{color : 'white'}}>Name: </label>
                 <input type="text" className="form-control" name="mysettings.general.name" placeholder="Name" id="general.ame" onChange={settingsChanged} defaultValue={settings['mysettings.general.name']} />
               </fieldset>


              <fieldset className='form-group'>

                <label for="profilePicture" style={{color : 'white'}}>Profile Picture </label>
                <input type="file" onChange={fileOnChange} />
                <button onClick={sendImage}>Upload</button>


              </fieldset>

               <fieldset className="form-group">
               <label for="profileBio" style={{color : 'white'}}>Bio: </label>
                 <input type="text" className="form-control" name="mysettings.general.bio" placeholder="Bio" id="general.bio" onChange={settingsChanged} defaultValue={settings['mysettings.general.bio']} />
               </fieldset>

               <fieldset className="form-group">
               <label for="profileEmail" style={{color : 'white'}}>Email Address: </label>
                 <input type="text" className="form-control" name="mysettings.general.email" placeholder="Email Address" id="general.em" onChange={settingsChanged} defaultValue={settings['mysettings.general.email']} />
               </fieldset>

               <fieldset className="form-group">
               <label for="profileColor" style={{color : 'white'}}>Display: </label>
               <select name="mysettings.general.color-theme" id="profileDisplay" className="form-control" defaultValue={settings['mysettings.general.display-theme']}>
               <option value="dark">Dark mode</option>
               <option value="light">Light mode</option>
             </select>
           </fieldset>

           <fieldset className="form-group">
               <label for="profilePassword" style={{color : 'white'}}>New Password: </label>
                 <input type="text" className="form-control" name="mysettings.general.password" placeholder="Enter new password" id="general.em" onChange={settingsChanged} />
               </fieldset>

               <fieldset className="form-group">
               <label for="profilePassword" style={{color : 'white'}}>Confirm Password: </label>
                 <input type="text" className="form-control" name="mysettings.general.confirmPassword" placeholder="Re-enter new password" id="general.em" onChange={settingsChanged} />
               </fieldset>

               <button type="Submit"> Save</button>
            </SettingsPage>
            <SettingsPage handler="/settings/profile" options={dynamicOptionsForProfilePage} />
        </SettingsPane>
     )
};

export default Settings