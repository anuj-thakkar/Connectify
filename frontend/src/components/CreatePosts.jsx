import React,{useState,useEffect} from 'react'
import { createPost } from '../services/usersService';
const CreatPost = ()=>{
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const postDetails = (e) => {
        if (title !== "" && body !== "") {
        createPost(localStorage.getItem('username'), title, body);
        }
    }
    return(
       <div className="card input-filed"
       style={{
           margin:"10px auto",
           maxWidth:"500px",
           padding:"5px",
           textAlign:"center"
       }}
       >
           <input 
           type="text"
            placeholder="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
           <input
            type="text"
             placeholder="body"
             value={body}
            onChange={(e)=>setBody(e.target.value)}
             />
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>postDetails()}
            >
                Submit post
            </button>

       </div>
   )
}


export default CreatPost