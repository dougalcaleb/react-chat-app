import React from "react";
import { Link } from "react-router-dom";


export default class Main extends React.Component {
   render() {
      return (
         <div>
            <div>Home page!</div>
            <Link to="/login">Log In</Link>
         </div>
         
      );
   }
}