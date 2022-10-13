import React, {useEffect} from "react";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from '../utils/StateProvider';

export default function SpotifyLogin() {
    //Spotify Information for Linking
    const CLIENT_ID = "53b5b899679f43d9b7c9bfdc2b612054"
    const SPOTIFY_AUTHORIZE = "https://accounts.spotify.com/authorize"
    const REDIRECT_URI = "http://localhost:3000/home"
    const SCOPES = ["user-read-currently-playing", 
                "user-read-playback-state"
                , "user-read-private"
                ,"user-modify-playback-state",
                "user-read-recently-played"];        
    const SCOPES_URL_PARAM = SCOPES.join("%20")

    const [{ token }, dispatch] = useStateProvider()

    const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHash = hash.substring(1);
    const paramInURL = stringAfterHash.split("&");
    const paramSplitUp = paramInURL.reduce((accumulator, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulator[key] = value;
    return accumulator;
    }, {});

    return paramSplitUp;
    }

 
   const handleLogin = () => {
     window.location = `${SPOTIFY_AUTHORIZE}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=TRUE`;
   }

   useEffect(() => {
     if (window.location.hash) {
       const {access_token, expires_in, token_type,} = getReturnedParamsFromSpotifyAuth(window.location.hash)
       
       dispatch({ type: reducerCases.SET_TOKEN, access_token });

             //replace with storing these values in our database, but for now storing in local storage for testing
         localStorage.clear()
         localStorage.setItem("accessToken", access_token)
         localStorage.setItem("tokenType", token_type)
         localStorage.setItem("expiresIn", expires_in)
     }
   }, [dispatch, token])

  return (
    <Container>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
        alt="spotify"
      />
      <button onClick={handleLogin}>Connect Spotify</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;
  img {
    height: 20vh;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    background-color: black;
    color: #49f585;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;