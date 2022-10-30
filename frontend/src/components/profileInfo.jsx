import React, { useEffect } from "react";
import { useState } from "react";
import fire from "../fire.js";
import logo from "./logo.jpg";
import Settings from "./Settings";
import { MdHomeFilled, MdBuild, MdAccountCircle, MdSearch, MdCompareArrows } from "react-icons/md";
import "../App.css";
import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

const ProfileInfo = () => {
  const [image, setState] = useState({});
  const [unfollow, setUnfollow] = useState(false);
  const [playlistName, setPlaylistName] = useState("")
  const [active, setActive] = useState('Cancel')

  const fileOnChange = (e) => {
    console.log(e.target.files[0]);
  };
  const [{ token, playlists, userInfo }, dispatch] = useStateProvider();

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
        email: data.email,
        userUrl: data.external_urls.spotify,
        name: data.display_name,
        imagesUrl: data.images[0].url,
        followers: data.followers,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);

  const signOut = () => {
    fire.auth().signOut();
  };

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
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
      window.location.reload(false);
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
        "name": playlistName,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      },
    );
    window.location.reload(false);
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
                  <a class="nav-link active" aria-current="page" href={`/home#access_token=${token}&token_type=Bearer&expires_in=3600`}><MdHomeFilled /> Home</a>


                  <a class="nav-link active" aria-current="page" onClick={Settings} href={`/home/settings#access_token=${token}&token_type=Bearer&expires_in=3600`}><MdBuild /> Settings</a>

                  <a class="nav-link active" aria-current="page" href={`../profile#access_token=${token}&token_type=Bearer&expires_in=3600`}><MdAccountCircle /> Profile</a>

                  <a class="nav-link active" aria-current="page" onClick={signOut} href="/#"><MdCompareArrows /> Sign out</a>

                </div>
              </div>
            </div>
          </nav>
        </div>
        <div class="itemright">
          <div class="unfollow-playlist">
            Unfollow Playlist?
            <button type="button" onClick={() => unfollowButton()} className="btn btn-outline-success">
              Yes
            </button>
            <button type="button" onClick={() => cancelUnfollowButton()} className="btn btn-outline-success">
              Cancel
            </button>
          </div>
          <div className="new-playlist">
            <form>
              Create New Playlist
              <input type="search" placeholder="Playlist Name" onChange={({ target }) => setPlaylistName(target.value)} aria-label="searchbar"></input>
              <button type="button" onClick={() => createPlaylist()} className="btn btn-outline-success">Create</button>
            </form>
          </div>
          <br></br>
          <h2 className="Current-Playlist-Header">
            Current Playlists
          </h2>

          <div>
            <ul>
              {playlists.map(({ name, id }) => {
                return (
                  <li key={id} onClick={() => unfollowPlaylist(id)}>
                    {name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div class="itemrest">
          <div
            style={{
              display: "block",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={imageUploader}
              style={{
                display: "none"
              }}
            />
            <div
              style={{
                color: "white",
                paddingTop: "5px",
                height: "60px",
                width: "60px",
              }}
              onClick={() => imageUploader.current.click()}
            >
              <img
                src={userInfo ? userInfo.imagesUrl : null}
                ref={uploadedImage}
                style={{
                  paddingTop: "5px",
                  width: "150px",
                  height: "150px",
                  position: "absolute"
                }}
              />
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          
          <div class="trial" align="left" style={{ color: 'white', paddingLeft: '30px' }}>
            <h3>hello, {userInfo ? userInfo.name : null}</h3>
            <h6>@{userInfo ? userInfo.userId : null}</h6>
            <h6>{userInfo ? userInfo.email : null}</h6>
            <h6>spotify followers: {userInfo ? userInfo.followers.total : null}</h6>
          </div>
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