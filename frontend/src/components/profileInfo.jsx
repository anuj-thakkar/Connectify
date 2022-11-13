import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fire from "../fire.js";
import logo from "../static/logo.jpg";
import { NavLink, Link } from "react-router-dom";
import Settings from "./Settings";
import {
  MdHomeFilled,
  MdBuild,
  MdAccountCircle,
  MdSearch,
  MdCompareArrows,
  MdChat,
  MdAddReaction
} from "react-icons/md";
import "../App.css";
import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import { useStreak } from "use-streak";
import Streak from "./Streak";

const ProfileInfo = () => {
  const [{ token, playlists, userInfo}, dispatch] = useStateProvider();
  var [playlistId] = useState("4VeOV08x3iNXrERRLt8SJl")
  const [image, setState] = useState({});
  const [unfollow, setUnfollow] = useState(false);

  const [active, setActive] = useState("Cancel");


  const [playlistName, setPlaylistName] = useState("")
  let navigate = useNavigate();
  
  const fileOnChange = (e) => {
    console.log(e.target.files[0]);
  };

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

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };


  function handleclick() {

    window.localStorage.setItem('status', document.getElementById('statusUpdate').value);

  }

  function clearStatus() {
    window.localStorage.removeItem('status');
  }

  const viewOrUnfollow = async (selectedPlaylistId) => {
    if (unfollow) {
      await axios.delete(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/followers`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      window.location.reload(false);
    }
    else {
      playlistId = selectedPlaylistId;
      navigate(`/playlist#access_token=${token}&token_type=Bearer&expires_in=3600`,
        {
          state: {
            PlaylistId: selectedPlaylistId,
          }
        }      
      )
      
    };
  };

  const unfollowButton = () => {
    setUnfollow(true);
  };

  const cancelUnfollowButton = () => {
    setUnfollow(false);
  };

  const createPlaylist = async () => {
    await axios.post(
      `https://api.spotify.com/v1/users/${userInfo.userId}/playlists`,
      {
        name: playlistName,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    window.location.reload(false);
    return;
  };

  return (
    <>
      <div class="grid-container">
        <div class="itemnav">
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
                    //onClick={MessageForm}
                    href={`/home/chat#access_token=${token}&token_type=Bearer&expires_in=3600`}
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
        <div class="itemright">
          <div
            class="trial"
            align="left"
            style={{
              color: "white",
              paddingTop: "5px",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            Unfollow Playlist? &nbsp;
            <button
              type="button"
              onClick={() => unfollowButton()}
              className="btn btn-outline-success"
            >
              Yes
            </button>
            &nbsp;
            <button
              type="button"
              onClick={() => cancelUnfollowButton()}
              className="btn btn-outline-success"
            >
              Cancel
            </button>
            <hr></hr>
          </div>

          <h5
            class="trial"
            align="left"
            style={{
              color: "white",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            Current Playlists

          </h5>

          <div
            class="trial"
            align="left"
            style={{
              color: "white",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >

          <Container>

            <ul>
              {playlists.map(({ name, id }) => {
                return (
                  <li key={id} onClick={() => viewOrUnfollow(id)}>
                    {name}
                  </li>
                );
              })}
            </ul>
            </Container>
          </div>
        </div>
        <div class="itemrest">
          <div
            style={{
              display: "block",
              alignItems: "center",

              justifyContent: "center",
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={imageUploader}
              style={{
                display: "none",
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
                  borderRadius: 30,
                  overflow: "hidden",
                  position: "absolute",
                }}
              />
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <div
            class="trial"
            align="left"
            style={{
              color: "white",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >

            <h3>hello, {window.localStorage.getItem('name')}</h3>
            <h6>@{window.localStorage.getItem('username')}</h6>
            <h6>{window.localStorage.getItem('email')}</h6>

            <h6>
              spotify followers: {userInfo ? userInfo.followers.total : null}
            </h6>
            <h6>
              <Streak streak={useStreak(localStorage, new Date())} />
            </h6>    
            <h6>Favorite Song: {window.localStorage.getItem('FavSong')}</h6>
            <h6>Bio: {window.localStorage.getItem('bio')}</h6>

            <hr></hr>
            <div>
              {window.localStorage.getItem('status') !== null  ? (
                <div>
                  <form>
                  <h6>Status: {window.localStorage.getItem('status')}</h6>
                  <button
                      class="btn btn-outline-success"
                      type="submit"
                      onClick={clearStatus}
                    >clear</button>
                    </form>

                </div>
              ) : (
                <div>
                  <fieldset class="d-flex justify-content-start">

                    <form>
                    <input type="text" placeholder="status update song" bio="bio" id='statusUpdate'/>

                    &nbsp;
                    <button
                      class="btn btn-outline-success"
                      type="submit"
                      onClick={handleclick}
                    >
                      submit
                    </button>

                    </form>

                  </fieldset>
                </div>
              )}
              <hr></hr>
            </div>

            <div>
              <fieldset class="d-flex justify-content-start">
                <input
                  type="text"
                  placeholder="new playlist name"
                  onChange={({ target }) => setPlaylistName(target.value)}
                  aria-label="searchbar"
                ></input>
                &nbsp;
                <button
                  type="button"
                  onClick={() => createPlaylist()}
                  className="btn btn-outline-success"
                >
                  create
                </button>
              </fieldset>
            </div>
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
<h3>hello, {window.localStorage.getItem('name')}</h3>
            <h6>@{window.localStorage.getItem('username')}</h6>
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
