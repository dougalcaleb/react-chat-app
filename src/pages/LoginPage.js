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
         <div>
            {/* <form onSubmit={this.handleSubmit}> */}
               {/* <h1>Login</h1> */}
               {/* <div>
                  <input placeholder="Email" type="email" name="email" onChange={this.handleChange} value={this.state.email}></input>
                  <input placeholder="Password" type="password" name="password" onChange={this.handleChange} value={this.state.password}></input>
               </div> */}
               {/* <button type="submit">Login</button> */}
               <button onClick={this.handleLogin}>Login with Google</button>
            {/* </form> */}
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            <Link to="/">Home</Link>
         </div>
      );
   }
}