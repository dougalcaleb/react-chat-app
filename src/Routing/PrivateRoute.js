import React from "react";
import { Redirect, Route } from "react-router-dom";

// This component is a additional functionality on top of React Router
// Used to make sure a user is authenticated before accessing the page
/* Used: 

<PrivateRoute 
   authenticated={ authentication value (boolean) } 
   redirectTo={ component path (string) } 
   exact path= redirect from (string) 
   component={ component to go to if authenticated (component) } 
/>

*/

const PrivateRoute = (props) => {
   console.log(props.authenticated);
   return props.authenticated ? (
      <Route exact path={props.path} component={props.component} />
   ) : (
      <Redirect to={{pathname: props.redirectTo, state: {from: props.location}}}></Redirect>
   )
}

export default PrivateRoute;