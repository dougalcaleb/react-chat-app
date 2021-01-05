// React
import React, { useState, useEffect } from "react";
import {
   HashRouter as Router,
   Route,
   Switch,
} from "react-router-dom";

// Components & Pages
import LoginPage from "./pages/LoginPage";
import Main from "./pages/Main";
import PrivateRoute from "./Routing/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";

// Services
import { auth } from "./services/firebase";
import { userInDB } from "./helpers/auth";
import { addUserToDB } from "./helpers/auth";

let userData = {};

const App = () => {
   let [authenticated, setAuth] = useState(false);
   let [user, setUser] = useState(null);

   // Login user on component mount
   //! PROBLEM: authentication is false and routes before can be true
   // POTENTIAL SOLUTION: localstorage can keep previously logged in user
   useEffect(() => {
      let userExists;
      auth().onAuthStateChanged((user) => {
         if (user) {
            userData = {
               email: user.email,
               displayName: user.displayName,
               photoURL: user.photoURL,
               uuid: user.uid
            }
            console.log(userData)
            userExists = userInDB(userData.email);
            if (userExists) {
               console.log("You are in the database");
               if (userData) {
                  setAuth(true);
                  setUser(userData);
               } else {
                  setAuth(false);
                  setUser(null);
               }
            } else {
               console.log("You are not in the database");
               addUserToDB(userData);
            }
         }
      });
   }, []);

   return (
      <Router>
         <Switch>
            <Route exact path="/">
               <Main authenticated={authenticated}></Main>
            </Route>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute authenticated={authenticated} redirectTo={"/login"} exact path="/profile" component={ProfilePage} />
         </Switch>
      </Router>
   );
}

console.log(userData);

export default App;
export { userData };