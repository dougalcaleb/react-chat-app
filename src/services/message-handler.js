import {db} from "./firebase";
import {userData} from "../App";
import {store} from "./data-handler";
import { useDebugValue } from "react";

// let mCount = 0;
// let knownMessages = 0;

// Send to and recieve from this collection
let Firestore_Message_Collection = "channels";

let knownActiveChannel = store.getState().activeChannel;

let unsubscriber = null;


// Channels
async function newChannel(name) {
	let newChannelId = store.getState().channels.length;
	await db.collection(Firestore_Message_Collection).doc(`channel-${newChannelId}`).set({id: newChannelId, name: name});
}

db.collection("channels")
	.orderBy("id", "asc")
	.onSnapshot(function (channels) {
		let newChannel = [];
		channels.forEach(function (doc) {
			newChannel.push(doc.data());
		});
		// console.log("CHANNELS UPDATE, OUTPUTTING:", newChannel);
		store.dispatch({type: "UPDATE_CHANNELS", channel: newChannel});
	});

async function getMessagesFromChannel(id) {
	let allMessages = await db.collection(Firestore_Message_Collection).doc(`channel-${id}`).collection("messages").orderBy("timestamp", "asc").get();
	let ml = [];
	allMessages.forEach(function (doc) {
		ml.push(doc.data());
	});
	store.dispatch({type: "UPDATE_MESSAGE_LIST", messages: ml, channelToUpdate: id});
}

// Messages
async function sendMessage(text) {
	let nm = {
		displayName: userData.displayName,
		timestamp: Date.now(),
		pic: userData.photoURL,
		uuid: userData.uuid,
		text: text,
	};
	let activeChannel = store.getState().activeChannel;
	let messageCount = store.getState().channels[activeChannel].messages.length;
	await db.collection(Firestore_Message_Collection).doc(`channel-${activeChannel}`).collection("messages").doc(`message-${messageCount}`).set(nm);
}

function setMessageListener() {
   if (unsubscriber !== null) {
      unsubscriber();
   }
	unsubscriber = db.collection(Firestore_Message_Collection)
		.doc(`channel-${store.getState().activeChannel}`)
		.collection("messages")
		.orderBy("timestamp", "asc")
		.onSnapshot(function (messages) {
			let ml = [];
			messages.forEach(function (doc) {
				ml.push(doc.data());
			});
			store.dispatch({type: "UPDATE_MESSAGE_LIST", messages: ml});
			// knownMessages = ml.length;
			// mCount = ml.length;
			console.log("Getting updated messages for channel " + store.getState().activeChannel);
		});
}

function checkActiveChannel() {
	// console.log("CHECKING");
	if (store.getState().activeChannel !== knownActiveChannel) {
		// console.log("CHANNEL SWITCHED");
		setMessageListener();
		knownActiveChannel = store.getState().activeChannel;
	}
}

async function getChannels() {
	let channels = await db.collection("channels").orderBy("id", "asc").get();
	let newChannel = [];
	channels.forEach(function (doc) {
		newChannel.push(doc.data());
	});
	// console.log("CHANNELS UPDATE, OUTPUTTING:", newChannel);
	store.dispatch({type: "UPDATE_CHANNELS", channel: newChannel});
}

async function getMessages() {
	let messages = await db
		.collection(Firestore_Message_Collection)
		.doc(`channel-${store.getState().activeChannel}`)
		.collection("messages")
		.orderBy("timestamp", "asc")
		.get();
	let ml = [];
	messages.forEach(function (doc) {
		ml.push(doc.data());
	});
	store.dispatch({type: "UPDATE_MESSAGE_LIST", messages: ml});
	// knownMessages = ml.length;
	// mCount = ml.length;
	// console.log("Getting updated messages for channel " + store.getState().activeChannel);
}

async function getAllData() {
   await getChannels();
   await getMessages();
}

function setup() {
   setMessageListener();
   getAllData();
}

document.onload = setup();

store.subscribe(checkActiveChannel);
export {sendMessage, newChannel, getMessagesFromChannel};