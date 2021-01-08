import { db } from "./firebase";
import { userData } from "../App";
import { store } from "./data-handler";

let mCount = 0;
let knownMessages = 0;
export let activeChannel = { id: 2, name: "" };

if (store.getState().channels == undefined || store.getState().channels[activeChannel.id] == undefined) {
   activeChannel.id = 0;
}

let USE_TESTING_DB = true;

let col = USE_TESTING_DB ? "messages-test" : "messages";

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
   newMessage.channel = activeChannel.id;
   await db.collection(col).doc("message-" + mCount).set(newMessage);
}

db.collection(col).orderBy("timestamp", "asc").onSnapshot(function (messages) {
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
   let messages = await db.collection(col).orderBy("timestamp", "asc").get();
   let ml = [];
   messages.forEach(function (doc) {
      ml.push(doc.data());
   });
   return ml;
}



document.onload = getAllMessages();

export { sendMessage, getAllMessages, messageList };