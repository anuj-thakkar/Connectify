import React, { useState, useEffect } from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Dropdown,
  Button,
  Row,
  Card,
} from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { useStateProvider } from "../utils/StateProvider";
//import axios from "axios";

const WeatherPlaylist = () => {
  const locationAPI =
    "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit=1&appid=fc20a95ffc4a7cad46b47b9bd5524e14";

  const weatherAPI =
    "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude=current&appid=fc20a95ffc4a7cad46b47b9bd5524e14";

  const [searchInput, setSearchInput] = useState("");
  const [currentLocationLat, setCurrentLocationLat] = useState("");
  const [currentLocationLon, setCurrentLocationLon] = useState("");
  const [currentWeather, setCurrentWeather] = useState("");
  const [{ token }, dispatch] = useStateProvider();
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    searchWeather();
  }, [currentLocationLat, currentLocationLon]);

  useEffect(() => {
    const min = 0;
    const max = 1000;
    const rand = Math.floor(min + Math.random() * (max - min));
    searchPlaylist(rand);
  }, [currentWeather]);

  async function searchLocation() {
    var results = await fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
        searchInput +
        ",US-IN,581&limit=1&appid=fc20a95ffc4a7cad46b47b9bd5524e14"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCurrentLocationLat(data[0].lat);
        setCurrentLocationLon(data[0].lon);
        //console.log(currentLocationLat, currentLocationLon);
        //searchWeather();
      });
  }

  async function searchWeather() {
    var results = await fetch(
      "https://api.openweathermap.org/data/3.0/onecall?lat=" +
        currentLocationLat +
        "&lon=" +
        currentLocationLon +
        "&exclude=minutely,hourly,daily,alerts&appid=fc20a95ffc4a7cad46b47b9bd5524e14"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCurrentWeather(data.current.weather[0].main);
        //console.log(currentWeather);
        //searchPlaylist();
      });
  }

  async function searchPlaylist(rand) {
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    var results = await fetch(
      "https://api.spotify.com/v1/search?q=" +
        currentWeather +
        "&type=playlist&limit=6&offset=" +
        rand,
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPlaylist(data.playlists.items);
      });
  }

  async function addPlaylist(playlist) {
    console.log(playlist.id);
    var searchParameters = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    var results = await fetch(
      "https://api.spotify.com/v1/playlists/" + playlist.id + "/followers",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPlaylist(data.playlists.items);
      });
    //console.log("SUCCESS");
  }

  return (
    <div>
      <Container>
        <InputGroup className="search-group" size="small">
          <FormControl
            placeholder="Location"
            type="input"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                searchLocation();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <button class="btn btn-outline-success" onClick={searchLocation}>
            Search
          </button>
        </InputGroup>
        {currentWeather}
      </Container>
      <Container>
        <Row className="search-group">
          {playlist.map((playlist, i) => {
            return (
              <Card
                className="text-white bg-dark"
                style={{
                  marginTop: "15px",
                  color: "black",
                  width: 200,
                  height: 200,
                }}
                onClick={() => addPlaylist(playlist)}
              >
                <Card.Img
                  src={playlist.images[0].url}
                  style={{ width: 100, height: 100 }}
                />
                <Card.Body>
                  <Card.Text className="fs-6">{playlist.name}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default WeatherPlaylist;
