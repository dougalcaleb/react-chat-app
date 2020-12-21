import React, { useState, useEffect } from "react";
import {
   HashRouter as Router,
   Route,
   Switch
} from "react-router-dom";


import { auth } from "./services/firebase";
import LoginPage from "./pages/LoginPage";
import Main from "./pages/main";
import PrivateRoute from "./Routing/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";


const App = () => {
   let [authenticated, setAuth] = useState(false);
   let [user, setUser] = useState(null);

   useEffect(() => {
      auth().onAuthStateChanged(user => {
         if (user) {
            setAuth(true);
            setUser(user);
            console.log(user);
         } else {
            setAuth(false);
            setUser(null);
         }
      });
   }, []);

   return (
      <Router>
         <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/login" component={LoginPage} />
            <PrivateRoute authenticated={authenticated} exact path="/profile" component={ProfilePage} />
         </Switch>
      </Router>
   );
}

export default App;