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
//import "../custom.scss";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [{ token }] = useStateProvider();
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
  return (
    <>
      <div className="search">
        <Container>
          <InputGroup className="mb-3" size="small">
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
            <Button onClick={search}>Search</Button>
          </InputGroup>
        </Container>
        <Container>
          <Row className="mx-2 row row-cols-4">
            {albums.map((album, i) => {
              return (
                <Card className="text-black">
                  {/* <Card.Img src={album.album.images[0].url} /> */}
                  <Card.Img
                    src={() => {
                      console.log("getting url");
                      if (album.album !== undefined) {
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
