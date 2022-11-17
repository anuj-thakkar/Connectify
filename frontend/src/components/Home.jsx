

import React, {useEffect, useRef} from 'react';
import logo from '../static/logo.jpg';
import fire from '../fire.js';
import Settings from './Settings';
import {MdHomeFilled, MdSearch, MdAccountCircle, MdBuild, MdCompareArrows, MdChat, MdAddReaction} from 'react-icons/md';

import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import styled from "styled-components";


import ListAllConnections from './ListAllConnections';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import ListSearchResults from './ListSearchResults';
import Volume from './Volume';
import PlayerControls from './PlayerControls';
import CurrentTrack from './CurrentTrack';
import Search from './Search';
import ChatForm from './Chat';

const Home = () => {
  const [{ token, userInfo, currentPlaying, playerState }, dispatch] = useStateProvider();
  const [setUserDetails] = useState();
  const searchModal = useRef(null)


  const [search, setSearch] = useState();
  const navigate = useNavigate();
  
  //Get User Info from Spotify API
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
        imagesUrl: data.images[0].url,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);

  const signOut = () => {
    fire.auth().signOut();
    localStorage.clear();
  };
  //Get Current Track Playing from Spotify API
  useEffect(() => {
    const getCurrentTrack = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data !== "") {
          console.log("Exists");
          const currentPlaying = {
            id: response.data.item.id,
            name: response.data.item.name,
            artists: response.data.item.artists.map((artist) => artist.name),
            image: response.data.item.album.images[2].url,
          };
          dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
        } else {
          dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
        }
      } catch (error) {
        console.log("API Get Error");
      }
    };
    getCurrentTrack();
  }, [token, dispatch]);
  if (currentPlaying != null) {
    console.log(currentPlaying.name);
  }


  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        //setUserDetails(results.user)
      });
  };

  return (
    <>
      <div class="grid-container">
        <div class="item1">Feed</div>
        <div class="item2">
          <nav class="navbar navbar-expand-lg navbar-dark bg-black">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">
                <img
                  src={logo}
                  alt=""
                  padding-left="10"
                  height="60"
                  class="d-inline-block align-text-top"
                ></img>
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                &nbsp; &nbsp;
                <div class="navbar-nav">
                  <a
                    class="nav-link active"
                    aria-current="page"
                    href={`/home#access_token=${token}&token_type=Bearer&expires_in=3600`}
                  >
                    <MdHomeFilled /> Home
                  </a>
                  &nbsp; &nbsp;
                  <a
                    class="nav-link active"
                    aria-current="page"
                    onClick={Settings}
                    href={`/home/settings#access_token=${token}&token_type=Bearer&expires_in=3600`}
                  >
                    <MdBuild /> Settings
                  </a>
                  &nbsp; &nbsp;
                  <a
                    class="nav-link active"
                    aria-current="page"
                    href={`../profile#access_token=${token}&token_type=Bearer&expires_in=3600`}
                  >
                    <MdAccountCircle /> Profile
                  </a>
                  &nbsp; &nbsp;
                  <a
                    class="nav-link active"
                    aria-current="page"
                    href={`../connections#access_token=${token}&token_type=Bearer&expires_in=3600`}
                  >
                    <MdAddReaction /> Connections
                  </a>
                  &nbsp; &nbsp;
                  <a
                    class="nav-link active"
                    aria-current="page"
                    onClick={ChatForm}
                    href={`/chat#access_token=${token}&token_type=Bearer&expires_in=3600`}
                  >
                    <MdChat /> Chat
                  </a>
                  &nbsp; &nbsp;
                  <a
                    class="nav-link active"
                    aria-current="page"
                    onClick={signOut}
                    href="/#"
                  >
                    <MdCompareArrows /> Sign out
                  </a>
                  
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div class="item3">
          <ListAllConnections />
          <Search/>
        </div>
        <div class="item4">
          <div>
            <CurrentTrack />
            <PlayerControls />
            <Volume />
          </div>
        </div>
        <div class="item6left">Poll 1</div>
        <div class="item6">Poll 2</div>
        <div class="item7">Poll 3</div>

      </div>
    </>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: #181818;
  border-top: 1px solid #282828;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`;

export default Home;
