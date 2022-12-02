import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
import axios from 'axios'
const AnotherUserProfile  = ()=> {

    // get the user id and its data from the Connectify API
    const [userProfile,setProfile] = useState([])
    useEffect(()=>{
       axios.get(`/user/${userid}`,{
        headers:{
            'Content-Type': 'application/json',
        }
        }).then(result=>{
            setProfile(result.data.user)
        }).catch(err=>{
            console.log(err)
        })
    },[]);

    const followUser = ()=> {
        axios.put('/follow',{
            followId:userid
        },{
            headers:{
                'Content-Type': 'application/json',
            }
        }).then(result=>{
            setProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,result.data._id]
                    }
                }
            })
        }).catch(err=>{
            console.log(err)
        })
    }

    const unfollowUser = ()=> {
        axios.put('/unfollow',{
            unfollowId:userid
        },{
            headers:{
                'Content-Type': 'application/json',
            }
        }).then(result=>{
            setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item !== result.data._id)
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
        }).catch(err=>{
            console.log(err)
        })
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
          <hr></hr>
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
        <div
          style={{
            display: "block",
            alignItems: "center",

            justifyContent: "center",
          }}
        >
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div
          class="trial"
          align="left"
          style={{
            color: "white",
            paddingLeft: "30px",
            paddingRight: "30px",
          }}
        >

          <h3>{userInfo ? userInfo.name : null} </h3>
          <h6>@{userInfo ? userInfo.userId : null}</h6>
          <h6>{window.localStorage.getItem('email')}</h6>

          <hr></hr>
          <div>
            <h6>{profile ? profile.user.followers.length : null} Followers</h6>
            <h6>{profile ? profile.user.following.length : null} Following</h6>
            <h6>Status: {window.localStorage.getItem('status')}</h6>

          </div>
        </div>
      </div>
    </div>
    </>
   )
};

export default AnotherUserProfile;