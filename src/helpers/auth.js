import { auth } from "../services/firebase";

// Sign in from provider with Firebase

export function signInWithGoogle() {
   const provider = new auth.GoogleAuthProvider();
   return auth().signInWithPopup(provider);
}