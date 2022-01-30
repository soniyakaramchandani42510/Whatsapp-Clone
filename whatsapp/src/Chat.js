import React,{useEffect,useState} from 'react';
import "./chat.css";
import {Avatar , IconButton} from "@material-ui/core";
// import AttatchFile from "@material-ui/icons/Attatchfile";
import {SearchOutlined ,AttachFile,MoreVert} from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import {useParams} from "react-router-dom";
import db from "./firebase";
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat/app';
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function Chat() {
    const [input,setInput] = useState("");
    const [seed,setSeed]= useState("");
    const { roomId } = useParams();
    const [roomName , setRoomName] = useState("");  //this will keep track of room or room name
    const [messages, setMessages] = useState([]);
    const [{ user },dispatch] = useStateValue();  //again we pull the user from the data layer
    const [emoji, setEmoji] = useState(false);
    useEffect(() => {
      
      if(roomId) {
        db.collection('rooms').doc(roomId)
        .onSnapshot((snapshot) => 
          setRoomName(snapshot.data().name)
        );

        db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp" , "asc")  //asc means in ascending order from oldest to newest
        .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) =>
        doc.data()))
        );
      }
    }, [roomId])    //this is depend over roomId , this will change the top of last seem according to the roomid
    //adding emojis
    const addEmoji = (e) => {
      let emoji = e.native;
      setInput(input + emoji);
    };

    //closing emoji picker
    const checkEmojiClose = () => {
      if (emoji) {
        setEmoji(false);
      }
    };


  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));

  }, [roomId]);  //seed that avatar changes everytime when roomid changes

  const sendMessage = (e) =>{        //e is for event
       e.preventDefault();
       console.log('we typed');

       db.collection('rooms').doc(roomId).collection
       ('messages').add({
         message: input,
         name: user.displayName,   //this display name coming from the google authentication
         timestamp: firebase.firestore.FieldValue
         .serverTimestamp(),              //we don't wanna use local timestamp, we can use server timestamp because of variation of time in different countries
       })                                 // this is how we get server timestamp because server time is always the same, from this we can see the time acc to our country timezone




       setInput("");
  };

  return (
  <div className='chat'>
      <div className="chat__header">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
      <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            last seen{" "}
            {new Date(
              messages[messages.length-1]?.timestamp?.toDate()
            ).toUTCString()}    
          </p>
      </div> 

      <div className="chat__headerRight">
              <IconButton>
                 <SearchOutlined/>
                 </IconButton>
                 <IconButton>
                 <AttachFile/>
                 </IconButton>
                 <IconButton>
                 <MoreVert/>
                 </IconButton>
      </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p className={`chat__message ${message.name === user.displayName &&    //this is for distingushing the message between the user and senders
          "chat__reciever"}`}>
          <span className='chat__name'>
            {message.name}</span>
             {message.message}
          <span className='chat__timestamp'>
            {new Date(message.timestamp?.toDate()
            ).toUTCString()}
            </span>
          </p>

        ))}
      </div>
      <div className="chat__footer">
      <IconButton>
                    <InsertEmoticonIcon  className="yellow"
                onClick={() => setEmoji(!emoji)}/>
                {emoji ? <Picker onSelect={addEmoji} /> : null}
               
                </IconButton>
        <form >
          <input 
          value={input}
          onChange={(e)=> setInput(e.target.value)}
          placeholder='Type a message' type="text" />
          <button onClick={sendMessage} type='submit'>Send a message</button>
        </form>
        <MicIcon/>

      </div>
  </div>
  );
}

export default Chat;