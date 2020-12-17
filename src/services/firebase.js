import firebase from "firebase";
import firebaseConfig from "./firebase-key";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const db = firebase.firestore();