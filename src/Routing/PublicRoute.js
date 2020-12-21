import React, { Component } from "react";
import { Route } from "react-router-dom";

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
   return (
      <Route {...rest} render={props => <Component {...props} />} ></Route>
   )
}

export default PublicRoute;