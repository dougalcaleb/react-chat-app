import { db } from "./firebase";
import { userData } from "../App";
import { store } from "./data-handler";

let mCount = 0;
let knownMessages = 0;

// Send to and recieve from this collection
let Firestore_Message_Collection = "messages";

let messageList = [];
let channelList = [{id: 0, name: "general"}];

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


async function newChannel(name) {
   let currentStore = store.getState().channels;
   await db.collection("channels").doc("channel-"+currentStore.length).set({id: currentStore.length, name: name, messages: []});
}

db.collection("channels").orderBy("id", "asc").onSnapshot(function (c) {
   let updateChannels = [];
   c.forEach(function (doc) {
      updateChannels.push(doc.data());
   });
   console.log("Channel update:");
   console.log(updateChannels);
   // if (updateChannels.data != store.getState().channels) {
      store.dispatch({ type: "UPDATE_CHNLS", channelName: updateChannels[updateChannels.length - 1].name });
   // }
});

/*
redux structure:

state: {
   channels: [{id: 0, name: "general", messages: []}, {id: 1, name: "channel 2", messages: []}, ...]
}

firebase structure:

channels {
   channel-0: {id: 0, name: "general"},
   channel-1: {id: 1, name: "channel 2"}
}




*/

async function getAllChannels() {
   let channels = await db.collection("channels").orderBy("id", "asc").get();
   let cl = [];
   channels.forEach(function (doc) {
      cl.push(doc.data());
   });
   if (cl.length == 0) {
      store.dispatch({ type: "CLR_CHNLS" });
      await newChannel("general");
   }
   store.dispatch({ type: "SET_CHNLS", data: cl });
   console.log("Got all channels:", cl);
}


window.onload = () => {
   getAllChannels();
   getAllMessages();

   setTimeout(() => {
      console.log("Window has loaded. Outputting state:");
      console.log(store.getState());
   }, 2000);
}

export { sendMessage, getAllMessages, messageList, newChannel };