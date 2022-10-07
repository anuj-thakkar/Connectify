import React, { useState } from "react";
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


const CLIENT_ID = "53b5b899679f43d9b7c9bfdc2b612054"
const SPOTIFY_AUTHORIZE = "https://accounts.spotify.com/authorize"
const REDIRECT_URI = "http://localhost:3000/home"
const SCOPES = ["user-read-currently-playing", "user-read-playback-state"];
const SCOPES_URL_PARAM = SCOPES.join("%20")

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
  
  console.log(isLoggedIn);
  return (
    <Container fluid>
      <div>
        <Router>
          {!isLoggedIn
            ? (
              <>
              <div class="App">
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
              </div>
              </>
            ) 
            : (
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
                      <a class="nav-link active" aria-current="page" onClick={handleLogin} href="#">Spotify Linking</a>
                      <a class="nav-link active" aria-current="page" onClick={signOut} href="#">Sign out</a>
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
            )}
        </Router>
      </div>
    </Container>
    
  );
}


export default App;

/*<button onClick={handleLogin}>
                Login to Spotify!
            </button>
            <span onClick={signOut}>
                <a href="#">Sign out</a>
            </span>*/
/*
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                  <a class="navbar-brand" href="#"><img src={logo} alt="" height="30" class="d-inline-block align-text-top"></img></a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                      <a class="nav-link active" aria-current="page" href="#">Home</a>
                      <a class="nav-link" href="/Login">Features</a>
                      <a class="nav-link" href="/Register">Pricing</a>
                    </div>
                  </div>
                </div>
              </nav>

              */