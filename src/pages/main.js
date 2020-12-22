import React from "react";
import { Link } from "react-router-dom";
import { signout } from "../helpers/auth";
import "../styles/index.css";
import Channels from "../components/channels";
import Messages from "../components/messages";
import setData from "../services/firebase-test";

// Main page
// This will house the chat and channels, and give links to profile and other pages

const Main = (props) => {
  return (
    <div>
      <header>
        {props.authenticated ? (
          <div className="links">
            <p onClick={signout}>Sign out</p>
            <p onClick={setData}>Set Data</p>
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

export default Main;
