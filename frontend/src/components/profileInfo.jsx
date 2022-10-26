import React, { useEffect } from "react";
import { useState } from "react";
import fire from "../fire.js";
import logo from '../static/logo.jpg';
import { NavLink, Link } from "react-router-dom";
import Settings from "./Settings";
import { MdHomeFilled, MdBuild, MdAccountCircle, MdSearch, MdCompareArrows} from "react-icons/md";
import "../App.css";
import axios from "axios";

const ProfileInfo = () => {
  const [image, setState] = useState({});
  const fileOnChange = (e) => {
    console.log(e.target.files[0]);
  };

  const sendImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avater", image);
    console.log(formData);

    axios
      .post("http://localhost:3001/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.json());
      })
      .catch((err) => {
        console.log(err.json());
      });
  };
  const signOut = () => {
    fire.auth().signOut();
  };
  return (
    <>
      <div class="grid-container">
          <div class="itemnav">
          <nav class="navbar navbar-expand-lg navbar-dark bg-black">
          <div class="container-fluid">
            <a class="navbar-brand" href="#"><img src={logo} alt="" padding-left="10" height="60" class="d-inline-block align-text-top"></img></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="/home"><MdHomeFilled/> Home</a>


                <a class="nav-link active" aria-current="page" onClick={Settings} href="/home/settings"><MdBuild/> Settings</a> 

                <a class="nav-link active" aria-current="page" href="../profile"><MdAccountCircle/> Profile</a>

                <a class="nav-link active" aria-current="page" onClick={signOut} href="/#"><MdCompareArrows/> Sign out</a>
                
                <a class="nav-link active" aria-current="page"><MdSearch/></a>
              </div>
            </div>
          </div>
          </nav>
        </div>
        <div class="itemrest"></div>
        
        </div>          
    </>
  );
};
/*
<div class="rowProfile">
          <div class="columnProfile">
            <fieldset className="form-group">
              <label for="profilePicture" style={{ color: "white" }}>
                Profile Picture{" "}
              </label>
              <input type="file" onChange={fileOnChange} />
              <button onClick={sendImage}>Upload</button>
            </fieldset>
          </div>
          <div class="columnProfile">
            <h3>Connections</h3>
          </div>
        </div>
        */
export default ProfileInfo;