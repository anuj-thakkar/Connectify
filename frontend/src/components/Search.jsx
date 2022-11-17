import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
//import "../custom.scss";


const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [{ token }, dispatch] = useStateProvider();
  const [albums, setAlbums] = useState([]);


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
    // var artistID = await fetch(
    //   "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
    //   searchParameters
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("artistID is ");
    //     console.log(data);
    //     return data.artists.items[0].id;
    //   });
    // //Get request with Artist ID grab all the albums from that artist
    // var returnedAlbums = await fetch(
    //   "https://api.spotify.com/v1/artists/" +
    //     artistID +
    //     "/albums?include_groups=album&market=US&limit=12",
    //   searchParameters
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("artists albums are:");
    //     console.log(data);
    //     setAlbums(data.items);
    //   });
    //Get request using search to get top tracks/artists
    var results = await fetch(
      "https://api.spotify.com/v1/search?q=" +
        searchInput +
        "&type=track,artist&limit=4",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAlbums(data.tracks.items);
        setAlbums((albums) => [...albums, ...data.artists.items]);
        console.log("it worked");
      });
  }

  const playTrack = async(track) => {
    console.log(track)
    var context_uri = track.album.uri
    var track_number = track.track_number
    var id = track.id
    var name = track.name
    var image = track.album.images[2].url
    var artists = track.artists.map((artist) => artist.name)
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
  
  return (
    <>
      <div align="center">
        <Container>
          <InputGroup className="search-group" size="small">
            <FormControl
              placeholder="Search for Artist"
              type="input"
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  search();
                }
              }}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <button class="btn btn-outline-success" onClick={search}>Search</button>
          </InputGroup>
        </Container>
        <Container>
          <Row className="search-group">
            {albums.map((album, i) => {
              return (
                <Card className="text-white bg-dark" style={{marginTop: "15px", color: "black"}} 
                onClick={() => playTrack(album)}>
                  {/* <Card.Img src={album.album.images[0].url} /> */}
                  <Card.Img
                    src={() => {
                      console.log("getting url");
                      if (album.type !== "artist") {
                        console.log("track");
                        return album.album.images[0].url;
                      } else {
                        console.log("artist");
                        return album.images[0].url;
                      }
                    }}
                  />
                  <Card.Body>
                    <Card.Text className="fs-6">{album.name}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Search;
