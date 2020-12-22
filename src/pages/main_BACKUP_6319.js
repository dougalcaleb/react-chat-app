import React from "react";
import { Link } from "react-router-dom";
import { signout } from "../helpers/auth";
<<<<<<< HEAD
import "../styles/index.css";
import Channels from "../components/channels";
import Messages from "../components/messages";
=======
import setData from "../services/firebase-test";
>>>>>>> fa46a643aa1e612846d3663cecd0660ee71e3d27

// Main page
// This will house the chat and channels, and give links to profile and other pages

<<<<<<< HEAD
const Main = (props) => {
  return (
    <div>
      <header>
        {props.authenticated ? (
          <div className="links">
            <p onClick={signout}>Sign out</p>
            <h1>Chat App</h1>
            <Link to="/profile">Profile</Link>
          </div>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </header>
      <main>
        <Channels />
        <Messages/>
      </main>
    </div>
  );
};
=======
const Main = (props) =>  {
   return (
      <div>
         <div>Home page!</div>
         {props.authenticated ? 
            <div>
               <button onClick={signout}>Sign out</button>
               <button><Link to="/profile">Profile</Link></button>
            </div>
            :
            <button><Link to="/login">Log in</Link></button>
         }
         <button onClick={setData}>Send Message</button>
      </div>
   )
}
>>>>>>> fa46a643aa1e612846d3663cecd0660ee71e3d27

export default Main;
