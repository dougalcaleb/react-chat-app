import { auth } from "../services/firebase";
import { db } from "../services/firebase";

export function signInWithGoogle() {
   const provider = new auth.GoogleAuthProvider();
   return auth().signInWithPopup(provider);
}

export function signout() {
   return auth().signOut();
}

let userData = {};

export async function userInDB(identifier) {
   const userExists = await db.collection("users").doc(identifier).get();
   if (userExists.exists) {
      return true;
   }
   return false;
}

export async function addUserToDB(user, identifier = "email") {
   try {
      await db.collection("users").doc(user[identifier]).set(user);
      return true;
   } catch (e) {
      console.error(e);
      return false;
   }
}