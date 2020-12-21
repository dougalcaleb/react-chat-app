import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props) => {
   console.log(props.authenticated);
   return props.authenticated ? (
      <Route exact path={props.path} component={props.component} />
   ) : (
      <Redirect to="/"></Redirect>
   )
}

export default PrivateRoute;