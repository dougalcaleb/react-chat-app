import { auth } from "../services/firebase";
import { db } from "../services/firebase";

let userData = {};

// Sign in from provider with Firebase

export function signInWithGoogle() {
   const provider = new auth.GoogleAuthProvider();
   return auth().signInWithPopup(provider);
   // let ud;
   // auth().signInWithPopup(provider).then(function (result) {
   //    ud = result.user;
   //    Object.assign(userData, ud);
   //    console.log("--- VERIFIED USER ---");
   // }).catch(function (error) {
   //    console.log(error.code);
   //    console.log(error.message);
   // });
   // return userData;
}

export function signout() {
   return auth().signOut();
}

export async function userInDB(identifier) {
   const userExists = await db.collection("users").doc(identifier).get();
   console.log("userExists: ",userExists.exists);
   if (userExists.exists) {
      return true;
   }
   return false;
}

export async function addUserToDB(user, identifier = "email") {
   console.log("Attempting to add user:");
   console.log(user);
   try {
      await db.collection("users").doc(user[identifier]).set(user);
      return true;
   } catch (e) {
      console.error(e);
      return false;
   }
}

export { userData };