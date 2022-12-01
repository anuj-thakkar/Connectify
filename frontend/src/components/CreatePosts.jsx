import React, { useState, useEffect } from 'react'
import { createPost } from '../services/usersService';
import { useStateProvider } from "../utils/StateProvider";
import "bootstrap/dist/css/bootstrap.min.css";

const CreatPost = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const postDetails = (e) => {
        if (title !== "" && body !== "") {
            createPost(localStorage.getItem('username'), title, body);
        }
    }
    const [{ token, userInfo }] = useStateProvider();
  var [limitReached, isLimitReached] = useState(false)
  setInterval(function (){
    var counter = document.getElementById('counter')
    var input = document.getElementById('input')
    var input_v = input.value;
    var input_vl = input_v.length;
    counter.innerHTML = input_vl;
    if (counter.innerHTML >= 160) {
      isLimitReached(true)
    }
    else {
      isLimitReached(false)
    }
    
},0)

  console.log(userInfo);
    return (
        
        <div className="item1">
            <div className="shareWrapper">
                <div className="shareTop">
                <img className="shareProfileImg" src={userInfo ? userInfo.imagesUrl : null} alt="" />
                &nbsp;
                <input
                    type="text"
                    classname="shareInput"
                    placeholder="type something..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                &nbsp;&nbsp;&nbsp;
                <button className="btn btn-outline-success"
                    onClick={() => postDetails()}
                >
                    Submit Post
                </button>
                </div>
            </div>
        </div>
    )
}


export default CreatPost