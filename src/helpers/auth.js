import { auth } from "../services/firebase";

export function signInWithGoogle() {
   const provider = new auth.GoogleAuthProvider();
   return auth().signInWithPopup(provider);
}






// continue:
// https://drive.google.com/file/d/1r7Ps_7Pu5qm1Hqe0xp1F_bq2-937wiiw/view 2:26:00-ish