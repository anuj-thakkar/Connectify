import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fire from "../fire.js";
import logo from "../static/logo.jpg";
import { NavLink, Link } from "react-router-dom";
import Settings from "./Settings";

import {
    MdHomeFilled,
    MdBuild,
    MdAccountCircle,
    MdSearch,
    MdCompareArrows,
    MdAddReaction,
    MdChat
} from "react-icons/md";
import "../App.css";
import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import ChatForm from './Chat';


const OtherUser = () => {
    let navigate = useNavigate();
    const [{ token }, dispatch] = useStateProvider();
    const [search, setSearch] = useState();
    const signOut = () => {
        fire.auth().signOut();
    };
    const searchForUser = async () => {
        console.log("searching for user");
        const fetchedEntries = await searchForUsers(document.getElementById("search-input").value);
        console.log(fetchedEntries);
    };
    // const fetchUsers = (query) => {
     //     setSearch(query);
     //     fetch("/search", {
     //         method: "post",
     //         headers: {
     //             "Content-Type": "application/json",
     //         },
     //         body: JSON.stringify({
     //             query,
     //         }),
     //     })
     //         .then((res) => res.json())
     //         .then((results) => {
     //             //setUserDetails(results.user)
     //         });
     // };
    return (
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
            <div class="itemleft">
                <div class="form-group">
                    <fieldset>
                        <form>
                        <br></br>
                            <input type="text" id="search-input" placeholder="Find Connections..."/>
                                <button class="btn btn-outline-success" type="submit" 
                                onClick={searchForUser}>Search</button>
                        </form>
                    </fieldset>
                </div>
            </div>
        </div>
    )
};


export default OtherUser;