import React, { useState , useEffect} from 'react';
import {Avatar , IconButton} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutLined from "@material-ui/icons/SearchOutlined"
import "./Sidebar.css";
import "./SidebarChat.css";
import SidebarChat from './SidebarChat';
import db from "./firebase";  //import db from the local firebase not the module firebase
import { useStateValue } from "./StateProvider";

function Sidebar() {
    const[{user},dispatch]=useStateValue();
    const [rooms,setRooms] = useState([]);  //first this is an empty array
    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc =>
                ({
                    id: doc.id,  //doc.id refers to the id inside the firebase
                    data: doc.data(),


                })
                ))  //docs is refer to the list of elements that we have in the database so we had two and we r gonna map through each one and for every doc we r gonna do the following
        )) //the one that we created in firestore database 
       
    }, []);   //by adding the empty brackets here , means run this once when the sidebar component loads and once only
    
  return (
      <div className="sidebar">
          <div className="sidebar__header">
              {/* hamare photo fetch ho jayega */}
             <Avatar src={user?.photoURL}/>   
             <div className="sidebar__headerRight">
                 <IconButton>
                 <DonutLargeIcon/>
                 </IconButton>
                 <IconButton>
                 <ChatIcon/>
                 </IconButton>
                 <IconButton>
                 <MoreVertIcon/>
                 </IconButton>
             </div>
          </div>
          <div className="sidebar__search">
              <div className="sidebar__searchContainer">
              <SearchOutLined/>
              <input placeholder="Search or start new chat" type="text" />
              </div>
              

          </div>
          <div className="sidebar__chats">
              <SidebarChat addNewChat/>
              {rooms.map(room => ( //for every single room there is a map
             
                <SidebarChat key={room.id} id={room.id}  name={room.data.name} /> 
                //this name is the property that we added in the databases                         //and here return a sidebar chat component
              ))}

          </div>
      </div>
  );
}

export default Sidebar;