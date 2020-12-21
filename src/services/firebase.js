import firebase from "firebase";
import firebaseConfig from "./firebase-key";

// Initialization of Firebase link and provider to other components

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const db = firebase.firestore();