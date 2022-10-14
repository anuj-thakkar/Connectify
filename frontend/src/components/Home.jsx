import React, {useEffect} from 'react';
import logo from './logo.jpg';
import fire from '../fire.js';
import { NavLink, Link } from 'react-router-dom';
import Settings from './Settings';
import {MdHomeFilled, MdSearch, MdAccountCircle, MdBuild, MdCompareArrows} from 'react-icons/md';
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';

const Home = () => {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);

    const signOut = () => {
        fire.auth().signOut();
      };
    
    console.log(token)
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
                <a class="nav-link active" aria-current="page" href="/home"><MdHomeFilled/> Home</a>

                <a class="nav-link active" aria-current="page" onClick={Settings} href="/home/settings"><MdBuild/> Settings</a> 

                <a class="nav-link active" aria-current="page" href="../profile"><MdAccountCircle/> Profile</a>

                <a class="nav-link active" aria-current="page" onClick={signOut} href="/#"><MdCompareArrows/> Sign out</a>
                
                <a class="nav-link active" aria-current="page"><MdSearch/></a>
                <form class="d-flex justify-content-end">
                <input class="form-control me-2" type="search" placeholder="Find Connections..." aria-label="Find Connections"></input>
                </form>
                <button class="btn btn-outline-success" type="submit"> Search </button>
                
              </div>
            </div>
          </div>
        </nav>
          </div>
          <div class="item3">Chats</div>  
          <div class="item4">Player</div>
          <div class="item6">Poll 1</div>
          <div class="item7">Poll 2</div>  
        </div>          
        </>
    )
}

export default Home;