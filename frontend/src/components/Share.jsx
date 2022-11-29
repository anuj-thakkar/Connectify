import "./share.css";
import React, { useEffect, useState} from "react";
import { useStateProvider } from "../utils/StateProvider";

import { reducerCases } from "../utils/Constants";
import "bootstrap/dist/css/bootstrap.min.css";
//import CharCountInput from "./CharCountInput";


export default function Share() {

  setInterval(function (){
    var counter = document.getElementById('counter')
    var input = document.getElementById('input')
    var input_v = input.value;
    var input_vl = input_v.length;
    counter.innerHTML = input_vl;
    if (counter.innerHTML > 160) {
      
    }
},0)


  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
          <input
            id="input"
            placeholder="What's in your mind?"
            className="shareInput"
          />
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption" >
                    {/* <PermMedia htmlColor="tomato" className="shareIcon"/> */}
                    <span className="shareOptionText">Photo</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="shareOptionText">Word Count: </span>
                    <span id ="counter" className="shareOptionText"> </span>
                </div>
            </div>
            <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
}