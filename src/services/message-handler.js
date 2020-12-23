import { db } from "./firebase";

let mCount = 0;
let knownMessages = 0;

const newMessage = {
   name: "Unknown",
   tag: "N/A",
   timestamp: 0,
   pic: null,
   uuid: null,
   text: "< Error >"
};

async function sendMessage(text, user) {
   newMessage.timestamp = Date.now();
   newMessage.text = text;
   newMessage.name = user.displayName;
   newMessage.pic = user.photoURL;
   newMessage.uuid = user.uid;
   await db.collection("messages").doc("message-" + mCount).set(newMessage);
}

db.collection("messages").orderBy("timestamp", "asc").onSnapshot(function (messages) {
   let ml = [];
   messages.forEach(function (doc) {
      ml.push(doc.data());
   });
   for (let a = knownMessages; a < ml.length; a++) {
      console.log("From: " + ml[a].name + " at " + ml[a].timestamp + " message: " + ml[a].text);
   }
   knownMessages = ml.length;
   mCount = ml.length;
});

async function getAllMessages() {
   let messages = await db.collection("messages").orderBy("timestamp", "asc").get();
   console.log(messages);
   let ml = [];
   messages.forEach(function (doc) {
      ml.push(doc.data());
   });
   for (let a = knownMessages; a < ml.length; a++) {
      console.log("From: " + ml[a].name + " at " + ml[a].timestamp + " message: " + ml[a].text);
   }
   knownMessages = ml.length;
   mCount = ml.length;
}

document.onload = getAllMessages();