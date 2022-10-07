import React, { useEffect, useState } from "react";
import axios from "axios"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import fire from './fire.js';
import Login from "./components/Login";
import Register from "./components/Register";
import logo from './components/logo.jpg';
import Container from 'react-bootstrap/Container' 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ForgotPassword from "./components/ForgotPassword"
import "bootstrap/dist/css/bootstrap.min.css"

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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sent, setSent] = useState(false)
  const[text, setText] = useState("")

  
  fire.auth().onAuthStateChanged((user) => {
      return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });
  
  const signOut = () => {
    fire.auth().signOut()
  };

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=TRUE`;
  }

  const handleSend = async (e) => {
		setSent(true)
		try {
			await axios.post("http://localhost:4000/send_mail", {
				text
			})
		} catch (error) {
			console.error(error)
		}
  }

  useEffect(() => {
    if (window.location.hash) {
      const {access_token, expires_in, token_type,} = getReturnedParamsFromSpotifyAuth(window.location.hash)
      console.log({access_token})
    }
  })
  
  console.log(isLoggedIn);
  return (
    <Container fluid>
      <div className="App">
        <Router>
          {!isLoggedIn
            ? (
              <>
              <Row>
                <Col><img src={logo} alt="logo"></img></Col>
                <Col>
                <Routes>
                  <Route exact path='/' element={<Login/>}/>
                  <Route exact path='/forgotPassword' element={<ForgotPassword/>}/>
                  <Route exact path='/register' element={<Register/>}/>
                </Routes>
                </Col>
                </Row>
              </>
            ) 
            : (
              <>
            <button onClick={handleLogin}>
                Login to Spotify!
            </button>
            <span onClick={signOut}>
                <a href="#">Sign out</a>
            </span>
              </>
            )}
        </Router>
      </div>
    </Container>
    
  );
}


export default App;
