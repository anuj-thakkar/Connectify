import "./share.css";
import React, { useEffect, useState} from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";

export default function Share() {
    const [{ token, selectedPlaylist}, dispatch] = useStateProvider();
    const [searchInput, setSearchInput] = useState("");
    const [albums, setAlbums] = useState([]);
    const [trackClicked, setTrackClicked] = useState(false)
    const [currentTrack, setCurrentTrack] = useState({})
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
        "&type=track&limit=3",
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

  const display = async(track) => {
    console.log(track)
    setTrackClicked(true)
    setCurrentTrack(track)
    console.log(trackClicked)
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
          <input
            placeholder="What's in your mind?"
            className="shareInput"
          />
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    {/* <PermMedia htmlColor="tomato" className="shareIcon"/> */}
                    <span className="shareOptionText">Photo</span>
                </div>
                <sp></sp>
                <span className="shareOptionText">Character Limit</span>
            </div>
            <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
}