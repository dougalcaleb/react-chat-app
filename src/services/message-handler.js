import { db } from "./firebase";
import { userData } from "../App";
import Messages from "../components/messages";
import { newMessage as createNewMessage } from "../components/messages";
import { updateStore, store } from "./data-handler";

let mCount = 0;
let knownMessages = 0;

let messageList = [];

const newMessage = {
   displayName: "Unknown",
   timestamp: 0,
   pic: null,
   uuid: null,
   text: "< Error >"
};

async function sendMessage(text) {
   newMessage.timestamp = Date.now();
   newMessage.text = text;
   newMessage.displayName = userData.displayName;
   newMessage.pic = userData.photoURL;
   newMessage.uuid = userData.uuid;
   await db.collection("messages").doc("message-" + mCount).set(newMessage);
}

db.collection("messages").orderBy("timestamp", "asc").onSnapshot(function (messages) {
   let ml = [];
   messages.forEach(function (doc) {
      ml.push(doc.data());
   });
   for (let a = 0; a < knownMessages; a++) {
      ml.shift();
   }

   console.log("New message in DB! It is:");
   console.log(ml);
   store.dispatch({ type: "UPLOAD", messages: ml });
   knownMessages += ml.length;
   mCount += ml.length;
});

async function getAllMessages() {
   let messages = await db.collection("messages").orderBy("timestamp", "asc").get();
   let ml = [];
   messages.forEach(function (doc) {
      ml.push(doc.data());
   });
   return ml;
}



document.onload = getAllMessages();

export { sendMessage, getAllMessages, messageList };