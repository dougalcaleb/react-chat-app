import React from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../helpers/auth";

// Login page: handles login/signup
// Does not properly handle new users yet

export default class LoginPage extends React.Component {
   state = {
      email: "",
      password: ""
   }

   handleSubmit = (e) => {
      e.preventDefault();
   }

   handleChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value
      })
   }

   handleLogin = async () => {
      try {
         await signInWithGoogle();
      
         let { state } = this.props.location;
         if (state && state.from) {
            this.props.history.push(state.from.pathname);
         } else {
            this.props.history.push("/");
         }
      } catch (e) {
         console.log(e);
      }
   }

   render() {
      return (
         <div className="login">
               <button onClick={this.handleLogin}>Log in or Sign Up with Google</button>
            <Link to="/">Home</Link>
         </div>
      );
   }
}