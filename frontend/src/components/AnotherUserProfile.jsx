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
       {userProfile ?
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
               display:"flex",
               justifyContent:"space-around",
               margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={userProfile.user.pic}
                   />
               </div>
               <div>
                   <h4>{userProfile.user.name}</h4>
                   <h5>{userProfile.user.email}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{userProfile.posts.length} posts</h6>
                       <h6>{userProfile.user.followers.length} followers</h6>
                       <h6>{userProfile.user.following.length} following</h6>
                   </div>
                   {showfollow?
                   <button style={{
                       margin:"10px"
                   }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>followUser()}
                    >
                        Follow
                    </button>
                    : 
                    <button
                    style={{
                        margin:"10px"
                    }}
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>unfollowUser()}
                    >
                        UnFollow
                    </button>
                    }
                   
                  

               </div>
           </div>
     
           <div className="gallery">
               {
                   userProfile.posts.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                       )
                   })
               }

           
           </div>
       </div>
       
       
       : <h2>loading...!</h2>}
       
       </>
   )
}

export default AnotherUserProfile;