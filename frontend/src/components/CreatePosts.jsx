import React,{useState, useEffect} from 'react'
import { createPost } from '../services/usersService';
import { useStateProvider } from "../utils/StateProvider";
import "../App.css";

const CreatPost = ()=>{
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const postDetails = (e) => {
        if (body !== "") {
        createPost(localStorage.getItem('username'), " ", body);
        }
    }
    const [{ token, userInfo }] = useStateProvider();
    return(
        <div className="item1">
            <div className="shareWrapper">
                <div className="shareTop">
                <img className="shareProfileImg" src={userInfo ? userInfo.imagesUrl : null} alt="" />
                &nbsp;
           <input
            type="text"
             placeholder="body"
             value={body}
            onChange={(e)=>setBody(e.target.value)}
             />
             &nbsp; &nbsp;
            <button className="btn btn-outline-success"
            onClick={()=>postDetails()}
            >
                Create Post
            </button>
            </div>
            </div>
       </div>
   )
}


export default CreatPost