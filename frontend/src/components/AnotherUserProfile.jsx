import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios'
import logo from "../static/logo.jpg";
import fire from "../fire.js";
import { callFollowUser, searchForUsers, callUnfollowUser } from '../services/usersService';
import { getUserInfo } from '../services/usersService';
import { useStateProvider } from "../utils/StateProvider";
import ListAllConnections from './ListAllConnections';
import {
    MdHomeFilled,
    MdBuild,
    MdAccountCircle,
    MdSearch,
    MdCompareArrows,
    MdChat,
    MdAddReaction
  } from "react-icons/md";

import Settings from "./Settings";
import ChatForm from './Chat';

const AnotherUserProfile  = ()=> {

    const [{ token}] = useStateProvider();
    const [otherUser, setOtherUser] = useState("");

    const [searched, setSearched] = useState("");


    // get the user id and its data from the Connectify API
    const [userProfile,setProfile] = useState([])

    const [userBio, setBio] = useState(""); 
    const [userEmail, setEmail] = useState("");
    const [userUsername, setUsername] = useState("");
    const [userFollowers, setFollowers] = useState("");
    const [userFollowing, setFollowing] = useState("");
    const [showfollow, setShowFollow] = useState(true);
    const [showFields, setShowFields] = useState(false);

    
    const retrieveUserInfo = async () => {
        if (otherUser !== "") {
            const userInfo = await getUserInfo(otherUser);
            console.log(userInfo);
        }
        var data = await getUserInfo(otherUser);
        //console.log(data.bio);
        if (data !== undefined) {
            setShowFields(true);
            setBio(data.bio);
            setEmail(data.email);
            setUsername(data.username);
            setFollowers(data.followers);
            setFollowing(data.following);
        } else {
            setShowFields(false);
            setSearched("User not found");
        }
        
    }

    const followUser = async () => {
        const userInfo = await callFollowUser(window.localStorage.getItem('username'), otherUser);
        console.log(userInfo);
        //setShowFollow(false);
    }

    const unfollowUser = async () => {
        const userInfo = await callUnfollowUser(window.localStorage.getItem('username'), otherUser);
        console.log(userInfo);
        setShowFollow(true);
    }

    const signOut = () => {
        fire.auth().signOut();
        localStorage.clear();
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
                  onClick={ChatForm}
                  href={`/chat#access_token=${token}&token_type=Bearer&expires_in=3600`}
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

<h3> {showFields ? 
                            
                            <h3> Username: {userUsername} <br></br>
                             Email: {userEmail} <br></br>
                              Bio: {userBio} <br></br>
                              Followers: {userFollowers.length} <br></br>
                              Following: {userFollowing.length} <br></br>

                              {showfollow?
                                <button className="btn btn-outline-success" style={{
                                    margin:"10px"
                                }}
                                  onClick={()=>followUser()}
                                  >
                                      Follow
                                  </button>
                                  : 
                                  <button
                                  style={{
                                      margin:"10px"
                                  }}
                                  className="btn btn-outline-danger"
                                  onClick={()=>unfollowUser()}
                                  >
                                      UnFollow
                                  </button>
                              }   
                              </h3> : 
                            
                            <h3> {searched} </h3>}
                          </h3>



        </div>


        <div
          class="trial"
          align="left"
          style={{
            color: "white",
            paddingLeft: "30px",
            paddingRight: "30px",
          }}
        >
        </div>
      </div>
      <div class="itemrest">
                <div class="form-group">
                    <fieldset>
                        <form>
                        <br></br>
                            <input type="text" id="search-input" placeholder="Find Connections..." onChange={(e)=>setOtherUser(e.target.value)}/>
                            <button class="btn btn-outline-success" type="submit" onClick={retrieveUserInfo}>Search



                            </button>
                            <ListAllConnections 
                            /> 
                            
                          

                            

                        </form>

                        
                    </fieldset>
                    

                </div>


            </div>
    </div>
    </>
   )
};

export default AnotherUserProfile;