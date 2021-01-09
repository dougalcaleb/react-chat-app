import { db } from "./firebase";
import { userData } from "../App";
import { store } from "./data-handler";

let mCount = 0;
let knownMessages = 0;
// export let activeChannel = { id: 0, name: "" };

// if (store.getState().channels == undefined || store.getState().channels[activeChannel.id] == undefined) {
//    activeChannel.id = 0;
// }

// Send to and recieve from this collection
let Firestore_Message_Collection = "messages";

let messageList = [];

let newMessage = {
   displayName: "Unknown",
   timestamp: 0,
   pic: null,
   uuid: null,
   channel: null,
   text: "< Error >"
};

async function sendMessage(text) {
   newMessage.timestamp = Date.now();
   newMessage.text = text;
   newMessage.displayName = userData.displayName;
   newMessage.pic = userData.photoURL;
   newMessage.uuid = userData.uuid;
   newMessage.channel = store.getState().activeChannel;
   await db.collection(Firestore_Message_Collection).doc("message-" + mCount).set(newMessage);
}

db.collection(Firestore_Message_Collection).orderBy("timestamp", "asc").onSnapshot(function (messages) {
   let ml = [];
   messages.forEach(function (doc) {
      ml.push(doc.data());
   });
   for (let a = 0; a < knownMessages; a++) {
      ml.shift();
   }
   store.dispatch({ type: "UPDATE_MSGS", messages: ml });
   knownMessages += ml.length;
   mCount += ml.length;
});

async function getAllMessages() {
   let messages = await db.collection(Firestore_Message_Collection).orderBy("timestamp", "asc").get();
   let ml = [];
   messages.forEach(function (doc) {
      ml.push(doc.data());
   });
   return ml;
}



document.onload = getAllMessages();

export { sendMessage, getAllMessages, messageList };