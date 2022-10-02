import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import fire from './fire.js';
import Login from "./components/Login";
import Register from "./components/Register";
import logo from './components/logo.jpg';
import Container from 'react-bootstrap/Container' 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    fire.auth().onAuthStateChanged((user) => {
      return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });
  
  const signOut = () => {
    fire.auth().signOut()
  };
  
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
                  <Route exact path='/register' element={<Register/>}/>
                </Routes>
                </Col>
                </Row>
              </>
            ) 
            : (
              <>
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