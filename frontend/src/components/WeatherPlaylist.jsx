import React, { useState } from "react";
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
        console.log(currentLocationLat, currentLocationLon);
        searchWeather(data);
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
        console.log(currentWeather);
      })
      .then(searchPlaylist);
  }

  async function searchPlaylist() {
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
        currentWeather +
        "&type=playlist&limit=4",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPlaylist(data.playlists.items);
      });
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
        {/* <InputGroup>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            State
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </InputGroup> */}
        {currentWeather}
      </Container>
      <Container>
        <Row className="search-group">
          {playlist.map((playlist, i) => {
            return (
              <Card
                className="text-white bg-dark"
                style={{ marginTop: "15px", color: "black" }}
                // onClick={() => playTrack(album)}>
              >
                <Card.Img src={playlist.images[0].url} />
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
