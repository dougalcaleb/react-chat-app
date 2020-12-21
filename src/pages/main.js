import React from "react";
import { Link } from "react-router-dom";
import { signout } from "../helpers/auth";


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
      </div>
   )
}

export default Main;