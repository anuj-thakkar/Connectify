import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import fire from './fire.js';
import Login from "./components/Login";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    fire.auth().onAuthStateChanged((user) => {
      return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });
  
  console.log('logged in?', isLoggedIn);
  return (
    <div className="App">
      <Router>
        
        {!isLoggedIn
          ? (
            <>
              <Routes>
                <Route exact path='/login' element={<Login/>}/>
              </Routes>
            </>
          ) 
          : (
            <>
              Hello World!
            </>
          )}
      </Router>
    </div>
  );
  }

export default App;