import { db } from "./firebase";

let mCount = 0;
let knownMessages = 0;

const newMessage = {
   name: "Bruh Mannington",
   tag: "@bruh",
   timestamp: Date.now(),
   pic: null,
   text: "sweet home alabama (no. "+mCount+")"
};

async function setData() {
   console.log(mCount);
   newMessage.timestamp = Date.now();
   newMessage.text = "sweet home alabama (no." + mCount + ")";
   const resolution = await db.collection("test").doc("message-" + mCount).set(newMessage);
   mCount++;
}

// async function readData() {

// }

db.collection("test").onSnapshot(function (messages) {
   // messages = messages.orderBy("", "desc");
   let ml = [];
   messages.forEach(function (doc) {
      ml.push(doc.data());
   });
   // console.log(knownMessages, ml.length - knownMessages);
   console.log("Adding " + (ml.length - knownMessages) + " to output");
   for (let a = knownMessages; a < ml.length; a++) {
      console.log("From: " + ml[a].name + " at " + ml[a].timestamp + " message: " + ml[a].text);
   }
   knownMessages = ml.length;
   mCount = ml.length;
});

async function getAllMessages() {
   // db.collection("test").orderBy("", "desc");
   let messages = await db.collection("test").orderBy("timestamp","desc").get();
   let ml = [];
   messages.forEach(function (doc) {
      ml.push(doc.data());
   });
   for (let a = knownMessages; a < ml.length; a++) {
      console.log("From: " + ml[a].name + " at " + ml[a].timestamp + " message: " + ml[a].text);
   }
   knownMessages = ml.length;
   mCount = ml.length;
   // console.log(ml);
   // console.log(knownMessages);
   // console.log(mCount);
}

document.onload = getAllMessages();

export default setData;