import React, { useState, useEffect } from "react";

import img from "../img.png";
import Attach from "../attach.png";

import logo from "../static/logo.jpg";
import { useStateProvider } from "../utils/StateProvider";
import Settings from "./Settings";
import fire from "../fire.js";
import ChatFeed from './ChatFeed';

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
import "../App.css";

import {ChatEngine} from 'react-chat-engine';
import './Chat.css';

const ChatForm = () => {
  const [{ token }] = useStateProvider();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    setMessage("");
  };

  useEffect(() => {

  }, [messages]);

  const signOut = () => {
    fire.auth().signOut();
    localStorage.clear();
  };

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
                  //onClick={MessageForm}
                  href={`/home/chat#access_token=${token}&token_type=Bearer&expires_in=3600`}
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
        <ChatEngine
            height="100vh"
            projectID="5c486811-745b-4945-a151-83eb47fcece8"
            userName="obonilla"
            userSecret="1234"
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
            //onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
        /> 
      
      

    </div>
        );

}

        export default ChatForm;