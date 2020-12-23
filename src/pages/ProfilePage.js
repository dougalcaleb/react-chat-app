import React from "react";
import { Link } from "react-router-dom";

import { userData } from "../App";

export default class ProfilePage extends React.Component {

   render() {
      return (
         <div>
            <p>Welcome {userData.displayName}</p>
            <Link to="/">Home</Link>
         </div>
      );
   }
}