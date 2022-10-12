import React, { useEffect, useState } from "react";
import axios from "axios"
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
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
import ProfileInfo from "./components/profileInfo";
import Search from "./components/Search";
import Home from "./components/Home"
import Settings from "./components/Settings"


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sent, setSent] = useState(false)
  const[text, setText] = useState("")

  
  fire.auth().onAuthStateChanged((user) => {
      return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });
  
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
        <BrowserRouter>
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
                 <Routes>
                  <Route path='/home' element={<Home/>}/>
                  <Route path='/home/settings' element={<Settings/>}/>
                  <Route path='/search' element={<Search/>}/>
                  <Route path='/profile' element={<ProfileInfo/>}/>
                </Routes>
              </>
            )}
        </BrowserRouter>
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