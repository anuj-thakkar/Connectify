import React, {useEffect} from 'react';
import logo from './logo.jpg';
import fire from '../fire.js';
import { NavLink, Link } from 'react-router-dom';
import Settings from './Settings';
import {MdHomeFilled, MdSearch} from 'react-icons/md';
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from '../utils/StateProvider';

const Home = () => {

    const signOut = () => {
        fire.auth().signOut()
      };
    
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
              
                <a class="nav-link active" aria-current="page" href="/"><MdHomeFilled/> Home</a>
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