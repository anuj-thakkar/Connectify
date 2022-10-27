import React, { useEffect } from "react";
import { useState } from "react";
import fire from "../fire.js";
import logo from "./logo.jpg";
import { NavLink, Link } from "react-router-dom";
import Settings from "./Settings";
import { MdHomeFilled, MdBuild, MdAccountCircle, MdSearch, MdCompareArrows} from "react-icons/md";
import "../App.css";
import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import {render} from 'react-dom';

const ProfileInfo = () => {
  const [image, setState] = useState({});
  const [unfollow, setUnfollow] = useState(false);
  const [playlistName, setPlaylistName] = useState("")

  const fileOnChange = (e) => {
    console.log(e.target.files[0]);
  };
  const [{ token, playlists, userInfo}, dispatch] = useStateProvider();
  //Get Playlists from Spotify API
  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = items.map(({ name, id }) => {
        return { name, id };
      });
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    };
    getPlaylistData();
  }, [token, dispatch]);
  ///Get user info from Spotify
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

  const sendImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avater", image);
    console.log(formData);

    axios
      .post("http://localhost:3001/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.json());
      })
      .catch((err) => {
        console.log(err.json());
      });
  };
  const signOut = () => {
    fire.auth().signOut();
  };

  const unfollowPlaylist = async (id) => {
    if (unfollow) {
      await axios.delete(
        `https://api.spotify.com/v1/playlists/${id}/followers`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
    }
  };

  const unfollowButton = () => {
    setUnfollow(true);
  }

  const cancelUnfollowButton = () => {
    setUnfollow(false)
  }

   const createPlaylist = async () => {
    await axios.post(
      `https://api.spotify.com/v1/users/${userInfo.userId}/playlists`,
       {
          "name":playlistName,
       },
       {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      },

    );
    return;
  } 

  return (
    <>
      <div class="grid-container">
          <div class="itemnav">
          <nav class="navbar navbar-expand-lg navbar-dark bg-black">
          <div class="container-fluid">
            <a class="navbar-brand" href="#"><img src={logo} alt="" padding-left="10" height="60" class="d-inline-block align-text-top"></img></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href={`/home#access_token=${token}&token_type=Bearer&expires_in=3600`}><MdHomeFilled/> Home</a>


                <a class="nav-link active" aria-current="page" onClick={Settings} href="/home/settings"><MdBuild/> Settings</a> 

                <a class="nav-link active" aria-current="page" href={`../profile#access_token=${token}&token_type=Bearer&expires_in=3600`}><MdAccountCircle/> Profile</a>

                <a class="nav-link active" aria-current="page" onClick={signOut} href="/#"><MdCompareArrows/> Sign out</a>
                
                <a class="nav-link active" aria-current="page"><MdSearch/></a>
              </div>
            </div>
          </div>
          </nav>
        </div>
        <div class="itemrest">
        Current Playlist
        <div class="unfollow-playlist">
          Unfollow Playlist?
        <button type="button" onClick={() => unfollowButton()} className="unfollow-button">
           Yes
        </button>
        <button type="button" onClick={() => cancelUnfollowButton()} className="unfollow-button">
          Cancel
        </button>
        <div className = "new-playlist">
        <form>
          Create New Playlist
          <input  type="search" placeholder="Playlist Name" onChange={({target}) => setPlaylistName(target.value)} aria-label="searchbar"></input>
          <button type="button" onClick={() => createPlaylist()} className="create-playlist-button">Create</button>
        </form>
        </div>
          
        </div>

        
        <Container>
          <ul>
          {playlists.map(({ name, id }) => {
            return (
            <li key={id} onClick={() => unfollowPlaylist(id)}>
              {name}
            </li>
            );
           })}
        </ul>
        </Container>
        </div>
        </div>         
    </>
  );
};

const Container = styled.div`
  color: #b3b3b3;
  height: 100%;
  overflow: hidden;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 55vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    li {
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        color: white;
      }
    }
  }
`;

/*
<div class="rowProfile">
          <div class="columnProfile">
            <fieldset className="form-group">
              <label for="profilePicture" style={{ color: "white" }}>
                Profile Picture{" "}
              </label>
              <input type="file" onChange={fileOnChange} />
              <button onClick={sendImage}>Upload</button>
            </fieldset>
          </div>
          <div class="columnProfile">
            <h3>Connections</h3>
          </div>
        </div>
        */
export default ProfileInfo;