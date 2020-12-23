import React from "react";
import { Link, useHistory } from "react-router-dom";
import PrivateRoute from "../Routing/PrivateRoute";
import { signout } from "../helpers/auth";
import "../styles/index.css";
import Channels from "../components/channels";
import Messages from "../components/messages";

// Main page
// This will house the chat and channels, and give links to profile and other pages

const Main = (props) => {
  return (
    <div>
      <header>
        {props.authenticated ? (
          <div className="links">
            <Link to="/login"><p onClick={signout}>Sign out</p></Link>
            <h1>Chat App</h1>
            <Link to="/profile">Profile</Link>
          </div>
        ) : (
            // <Redirect to="/login"></Redirect>
            <PrivateRoute authenticated={false} redirectTo={"/login"} redirectFrom="/" component={Main} />
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
