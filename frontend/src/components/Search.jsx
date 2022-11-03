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

const Search = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <div className="search">
        <Container>
          <InputGroup className="mb-3" size="small">
            <FormControl
              placeholder="Search for Artist"
              type="input"
              onKeyPress={(event) => {
                if (event.key == "Enter") {
                  console.log("pressed enter");
                }
              }}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <Button
              onClick={() => {
                console.log("Clicked Search");
              }}
            >
              Search
            </Button>
          </InputGroup>
        </Container>
        <Container>
          <Row className="mx-2 row row-cols-4">
            <Card>
              <Card.Img src="#" />
              <Card.Body>
                <Card.Title>Album Name Here</Card.Title>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Search;
