import React from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../helpers/auth";

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

   render() {
      return (
         <div>
            <form onSubmit={this.handleSubmit}>
               <h1>Login</h1>
               <div>
                  <input placeholder="Email" type="email" name="email" onChange={this.handleChange} value={this.state.email}></input>
                  <input placeholder="Password" type="password" name="password" onChange={this.handleChange} value={this.state.password}></input>
               </div>
               <button type="submit">Login</button>
               <button onClick={() => signInWithGoogle()}>Login with Google</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
         </div>
      );
   }
}