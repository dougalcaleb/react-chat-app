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
}

// async function readData() {

// }

db.collection("test").orderBy("timestamp", "asc").onSnapshot(function (messages) {
   // messages = messages.orderBy("timestamp", "asc");
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
   let messages = await db.collection("test").orderBy("timestamp", "asc").get();
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
   // console.log(ml);
   // console.log(knownMessages);
   // console.log(mCount);
}

setInterval(() => {
   console.log(knownMessages, mCount);
}, 1000);

async function deleteCollection(collectionPath = "test", batchSize = 100) {
   const collectionRef = db.collection(collectionPath);
   const query = collectionRef.orderBy("timestamp", "asc").limit(batchSize);
 
   return new Promise((resolve, reject) => {
     deleteQueryBatch(query, resolve).catch(reject);
   });
 }
 
 async function deleteQueryBatch(query, resolve) {
   const snapshot = await query.get();
 
   const batchSize = snapshot.size;
   if (batchSize === 0) {
     // When there are no documents left, we are done
     resolve();
     return;
   }
 
   // Delete documents in a batch
   const batch = db.batch();
   snapshot.docs.forEach((doc) => {
     batch.delete(doc.ref);
   });
   await batch.commit();
 
   // Recurse on the next process tick, to avoid
   // exploding the stack.
   process.nextTick(() => {
     deleteQueryBatch(query, resolve);
   });
 }

document.onload = getAllMessages();

export default setData;
export { deleteCollection };