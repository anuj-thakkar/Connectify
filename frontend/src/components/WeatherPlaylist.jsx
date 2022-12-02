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

const WeatherPlaylist = () => {
  const locationAPI =
    "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit=1&appid=fc20a95ffc4a7cad46b47b9bd5524e14";

  const weatherAPI =
    "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude=current&appid=fc20a95ffc4a7cad46b47b9bd5524e14";

  const [searchInput, setSearchInput] = useState("");
  const [currentLocationLat, setCurrentLocationLat] = useState("");
  const [currentLocationLon, setCurrentLocationLon] = useState("");
  const [currentWeather, setCurrentWeather] = useState("");

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
      })
      .then(searchWeather());
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
      });
  }

  return (
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
  );
};

export default WeatherPlaylist;
