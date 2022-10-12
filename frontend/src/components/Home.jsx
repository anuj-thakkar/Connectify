import React, {useEffect} from 'react';
import logo from './logo.jpg';
import fire from '../fire.js';
import { NavLink, Link } from 'react-router-dom';
import Settings from './Settings';

//Spotify Information for Linking
const CLIENT_ID = "53b5b899679f43d9b7c9bfdc2b612054"
const SPOTIFY_AUTHORIZE = "https://accounts.spotify.com/authorize"
const REDIRECT_URI = "http://localhost:3000/home"
const SCOPES = ["user-read-currently-playing", "user-read-playback-state"];
const SCOPES_URL_PARAM = SCOPES.join("%20")

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHash = hash.substring(1);
  const paramInURL = stringAfterHash.split("&");
  const paramSplitUp = paramInURL.reduce((accumulator, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulator[key] = value;
    return accumulator;
  }, {});

  return paramSplitUp;
}
const Home = () => {
    const signOut = () => {
        fire.auth().signOut()
      };
    
      const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=TRUE`;
      }

      useEffect(() => {
        if (window.location.hash) {
          const {access_token, expires_in, token_type,} = getReturnedParamsFromSpotifyAuth(window.location.hash)
          console.log({access_token})
        }
      })
    
    return (
        <>
        <div class="grid-container">
          <div class="item1">Feed</div>
          <div class="item2">
          <nav class="navbar navbar-expand-lg navbar-dark bg-black">
          <div class="container-fluid">
            <a class="navbar-brand" href="#"><img src={logo} alt="" padding-left="10" height="60" class="d-inline-block align-text-top"></img></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="/">Home</a>
                <a class="nav-link active" aria-current="page" onClick={handleLogin}>Spotify Linking</a>
                <a class="nav-link active" aria-current="page" onClick={Settings} href="/home/settings">Settings</a> 
                <Link to='../profile'>
                <button class="button1" >
                    <img className="buttonImg" src={require('./profileIcon.png')} />
                  </button> 
                </Link>
                <Link to='../search'>
                    <button class="button2" >
                        <img className="buttonImg" src={require('./searchIcon.png')} />
                    </button>  
                </Link>                
                <a class="nav-link active" aria-current="page" onClick={signOut} href="/#">Sign out</a>
              </div>
            </div>
          </div>
        </nav>
          </div>
          <div class="item3">Chats</div>  
          <div class="item4">Poll1</div>
          <div class="item5">Poll2</div>
          <div class="item6">Poll3</div>
        </div>          
        </>
    )
}

export default Home;