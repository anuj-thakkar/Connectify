import axios from "axios";
import React, { useEffect, useState} from "react";
import {useLocation} from "react-router-dom"
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { AiFillClockCircle } from "react-icons/ai";
import { reducerCases } from "../utils/Constants";
import logo from "../static/logo.jpg";
import Settings from "./Settings";
import { MdHomeFilled, MdBuild, MdAccountCircle, MdSearch, MdCompareArrows } from "react-icons/md";
import "../App.css";
import fire from "../fire.js";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";

export default function Body() {
  const [{ token, selectedPlaylist}, dispatch] = useStateProvider();
  const [searchInput, setSearchInput] = useState("");
  const [albums, setAlbums] = useState([]);
  const [remove, setRemove] = useState(false);
  const { state } = useLocation();
  
  useEffect(() => {
    if (state.PlaylistId) {
      const getInitialPlaylist = async () => {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${state.PlaylistId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        const selectedPlaylist = {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description.startsWith("<a")
            ? ""
            : response.data.description,
          image: response.data.images[0].url,
          tracks: response.data.tracks.items.map(({ track }) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
            image: track.album.images[2].url,
            duration: track.duration_ms,
            album: track.album.name,
            context_uri: track.album.uri,
            track_number: track.track_number,
            uri: track.uri,
          })),
        };
        dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
      };
      getInitialPlaylist(); 
      console.log(state.PlaylistId)
    } 
  }, [token, dispatch]); 

  const signOut = () => {
    fire.auth().signOut();
  };

  //search
  async function search() {
    console.log("Searching for " + searchInput);

    //Get request using search to get Artist ID
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    var results = await fetch(
      "https://api.spotify.com/v1/search?q=" +
        searchInput +
        "&type=track&limit=4",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAlbums(data.tracks.items);
        //setAlbums((albums) => [...albums, ...data.artists.items]);
        console.log("it worked");
      });
    }

  const playTrack = async (
    id, name, artists, image, context_uri, track_number, uri,
  ) => {
    console.log(remove)
    if (remove) {
      const tracks = [{"uri": uri}]
      var parameters = {
        method: "DELETE",
        body: "{\"tracks\":[{\"uri\":\"" + uri + "\"}]}",  
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      await fetch(
        "https://api.spotify.com/v1/playlists/" +
          state.PlaylistId +
          "/tracks",
        parameters,
      ) 
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          
        }); 
    window.location.reload(false)
    }
    else {
      const response = await axios.put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          context_uri,
          offset: {
            position: track_number - 1,
          },
          position_ms: 0,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 204) {
        const currentPlaying = {
          id,
          name,
          artists,
          image,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      } else {
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      }
    }
  };

  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const removeButton = () => {
    setRemove(true);
  }

  const cancelRemoveButton = () => {
    setRemove(false)
  }

  const addSong = async (track) => {
    var parameters = {
      method: "POST", 
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    await fetch(
      "https://api.spotify.com/v1/playlists/" +
        state.PlaylistId +
        "/tracks?uris=" + track.uri,
      parameters,
    ).then((response) => response.json())
    .then((data) => {
      console.log(data);
    }); 
    window.location.reload(false)
  }

  return (
    
    <Container >
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
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="selected playlist" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
            <div class="remove-song">
            Remove Song?
            &nbsp;
            <button type="button" onClick={() => removeButton()} className="btn btn-outline-success">
              Yes
            </button>
            &nbsp;
            &nbsp;
            <button type="button" onClick={() => cancelRemoveButton()} className="btn btn-outline-success">
              Cancel
            </button>
       <div className="search">
          <InputGroup className="mb-3" size="small">
            <FormControl
              placeholder="Search for Song"
              type="input"
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  search();
                }
              }}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <br></br>
            <button class="btn btn-outline-success" onClick={search}>Search</button>
          </InputGroup>
          <Row className="mx-2 row row-cols-4">
            {albums.map((album, i) => {
              return (
                <Card className="text-black" onClick={() => addSong(album)}>
                                    {<Card.Img src={album.album.images[0].url} /> }
                                    <Card.Img/>
                  <Card.Body>
                    <Card.Text className="fs-6">{album.name}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </Row>
      </div>
          </div>
          </div>
          <div className="list">
            <div className="header-row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                    uri,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      onClick={() =>
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number,
                          uri
                        )
                      }
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }
  .list {
    .header-row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      margin: 1rem 0 0 0;
      color: #dddcdc;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: "none";
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
            width: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`;