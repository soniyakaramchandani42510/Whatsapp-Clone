import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
//router ko import kiya-router se load nhi hota page
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  // const[user,setUser]=useState(null);   //for user authentication
  const[{user},dispatch]=useStateValue();
  return (
    <>
      <div className="app">
        {!user ?(    //if user is not login show login page else reder the whatsapp page
         <Login />
        ):<div className="app__body">
        <Router>
             {/* sidebar */}
             {/* //always shows up */}
             <Sidebar />  
          <Switch>
           
             {/* <Route path="/">
            <Chat />
            </Route> */}
            <Route path="/rooms/:roomId">               
              {/*  show chat only when there is a room id */}
              <Chat />
            </Route>
            
          </Switch>
        </Router>
      </div>}
        
      </div>
    </>
  );
}

export default App;
