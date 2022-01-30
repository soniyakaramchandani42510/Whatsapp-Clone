import React from 'react';
import "./SidebarChat.css"
import "./Sidebar.css"
import "./Sidebar.js"
import db from './firebase';
import { useState,useEffect } from 'react';
import {Avatar,IconButton} from "@material-ui/core";
import { Link } from "react-router-dom";


 function SidebarChat({id,name,addNewChat}) {
    console.log({name});
     //random aavatar banane k liye yeh use state use kia
  const[seed,setSeed]=useState("");
  const [messages, setMessages] = useState("");   //for last message
  useState(() => {
   setSeed(Math.floor(Math.random()*5000));
 
}, []);

const createChat=()=>{
const roomName=prompt("enter name for chat room"); //pop up dialog box appear to enter name and we store the name in variable roomName
if (roomName){
    //do some database stuff
    db.collection('rooms').add({
        name:roomName,  //hm ab database mai add kar hai jo hmne enter kiya tha 
                        // roomname mai
                        
    })
}
}
//for last message
useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")   //descending order mai kar diya hai so that last msg most recent hoga and vahi display hoga
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  
  return !addNewChat ?(
      <>
      {/* har chat name ko clickable banane k liye hmne link to use kiya hai */}
  <Link to={`/rooms/${id}`}> 
  <div className="sidebarChat">
      {/* random string end mai lagane se random avatar milte hai */}
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
  
  <div className="sidebarChat__info">
   <h2>{name}</h2>
{/* last message */}
   <p>{messages[0]?.message}</p>
  </div>
  </div>
  </Link>
  
  </>
  ):(
    <div className="sidebarChat" onClick={createChat} >
  
       <h2>Add new chats</h2>
   </div>
   
  );
}
export default SidebarChat;