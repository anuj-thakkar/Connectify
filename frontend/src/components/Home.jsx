import React, {useEffect} from 'react';
import logo from './logo.jpg';
import fire from '../fire.js';
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { NavLink, Link } from 'react-router-dom';
import Settings from './Settings';
import {MdHomeFilled, MdSearch, MdAccountCircle, MdBuild, MdCompareArrows} from 'react-icons/md';
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import styled from "styled-components";
import ListAllConnections from './ListAllConnections';
import { searchForUsers } from '../services/usersService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListSearchResults from './ListSearchResults';


const Home = () => {
  const [{ token, userInfo, currentPlaying, playerState }, dispatch] = useStateProvider();
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  
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
      };
    
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
            console.log("Exists")
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
      console.log(currentPlaying.name)
    } 

    const changeState = async () => {
      const state = playerState ? "pause" : "play";
      await axios.put(
        `https://api.spotify.com/v1/me/player/${state}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch({
        type: reducerCases.SET_PLAYER_STATE,
        playerState: !playerState,
      });
    };

    const changeTrack = async (type) => {
      await axios.post(
        `https://api.spotify.com/v1/me/player/${type}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      const response1 = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response1.data !== "") {
        const currentPlaying = {
          id: response1.data.item.id,
          name: response1.data.item.name,
          artists: response1.data.item.artists.map((artist) => artist.name),
          image: response1.data.item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
      }
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
                <a class="nav-link active" aria-current="page" href="/home"><MdHomeFilled/> Home</a>


                <a class="nav-link active" aria-current="page" onClick={Settings} href="/home/settings"><MdBuild/> Settings</a> 

                <a class="nav-link active" aria-current="page" href="../profile"><MdAccountCircle/> Profile</a>

                <a class="nav-link active" aria-current="page" onClick={signOut} href="/#"><MdCompareArrows/> Sign out</a>
                
                <a class="nav-link active" aria-current="page"><MdSearch/></a>
                <form class="d-flex justify-content-end">
                <input class="form-control me-2" type="search" placeholder="Find Connections..." aria-label="searchbar"></input>
                </form>
                <button class="btn btn-outline-success" type="submit"> Search </button>
    
              </div>
            </div>
          </div>
        </nav>
          </div>
          <div class="item3"> 
            <ListAllConnections />
          </div>  
    <div class="item4">
      <div>
                 {currentPlaying && (
          <div className="track">
            <div className="track__image">
              <img src={currentPlaying.image} alt="currentPlaying" />
           </div>
           <div className="track__info">
            <h4 className="track__info__track__name">{currentPlaying.name}</h4>
            <h6 className="track__info__track__artists">
              {currentPlaying.artists.join(", ")}
            </h6>
          </div>
        </div>
        )}
        </div>
        <Container2>
        <div className="shuffle">
          <BsShuffle />
        </div>
        <div className="previous">
          <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
        </div>
        <div className="state">
          {playerState ? (
            <BsFillPauseCircleFill onClick={changeState} />
          ) : (
            <BsFillPlayCircleFill onClick={changeState} />
          )}
        </div>
        <div className="next">
          <CgPlayTrackNext onClick={() => changeTrack("next")} />
        </div>
        <div className="repeat">
          <FiRepeat />
        </div>
      </Container2>
    </div>
          <div class="item6">Poll 1</div>
          <div class="item7">Poll 2</div>  
        </div>          
        </>
    )
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__image {
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      &__track__name {
        color: white;
      }
      &__track__artists {
        color: #b3b3b3;
      }
    }
  }
`;

const Container2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
`;

export default Home;
