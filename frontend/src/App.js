import React, { useEffect, useState } from "react";
import axios from "axios"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css";
import fire from './fire.js';
import Login from "./components/Login";
import Register from "./components/Register";
import logo from './components/logo.jpg';
import { Row, Col, Container } from 'react-bootstrap';
import ForgotPassword from "./components/ForgotPassword"
import Settings from "./components/Settings"
import ProfileInfo from "./components/profileInfo";
import Search from "./components/Search";
import Home from "./components/Home"
import SpotifyLogin from "./components/SpotifyLogin";
import { reducerCases } from "./utils/Constants";
import { useStateProvider } from "./utils/StateProvider";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sent, setSent] = useState(false)
  const [text, setText] = useState("")


  
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

  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch({ type: reducerCases.SET_TOKEN, token });
      }
    }
    document.title = "Spotify";
  }, [dispatch, token]);

  return (
    <Container fluid>
      <div>
        <Router>
          {isLoggedIn
            ? (
              <>
                <Routes>
                  <Route path='/link' element={<SpotifyLogin/>}/>
                  <Route path='/home' element={<Home/>}/>
                  <Route path='/home/settings' element={<Settings/>}/>
                  <Route path='/search' element={<Search/>}/>
                  <Route path='/profile' element={<ProfileInfo/>}/>
                </Routes>
              </>
            ) 
            : (
              <>
              <div class="App">
              <Row>
                <Col><img src={logo} alt="logo"></img></Col>
                <Col>
                <Routes>
                  <Route exact path='/' element={<Login/>}/>
                  <Route exact path='/forgotPassword' element={<ForgotPassword/>}/>
                  <Route exact path='/register' element={<Register/>}/>
                  <Route exact path='/home/settings' element={<Settings/>}/>
                </Routes>
                </Col>
                </Row>
              </div>
              </>
            )}
        </Router>
      </div>
      
    </Container>
    
  );
}


export default App;