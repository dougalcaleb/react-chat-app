import React from "react";
import { createStore } from "redux";

// const combined = combineReducers(messageReducer);
const store = createStore(updateStore);

function updateStore(state = { channels: [{ name: "general", messages: [] }] }, action) {
   switch (action.type) {
      case "UPDATE_MSGS":
         console.log("update:");
         console.log(state);
         console.log(action);
         if (action.messages) {
            return sortMessages(action.messages, state);
            // return { messages: state.messages.concat(action.messages), channels: [] };
         } else {
            return { channels: [{name: "general", messages: []}] };
         }
      case "UPDATE_CHNLS":
         console.log("Updating channels. Current/Action:");
         console.log(state);
         console.log(action);
         return { channels: [...state.channels, { name: action.channelName, messages: [] }] };
      default:
         return state;
   }
}

function sortMessages(ml, state) {
   console.log("Sorting new messages. Operating with arguments: (ml / state)");
   console.log(ml);
   console.log(state);

   let sorted = { channels: state.channels };

   for (let a = 0; a < ml.length; a++) {
      if (!sorted.channels[ml[a].channel]) {
         console.log("Starting a new channel:", ml[a].channel);
         sorted.channels[ml[a].channel] = { name: "", messages: [] };
      }
      sorted.channels[ml[a].channel].messages.push(ml[a]);
   }

   for (let b = 0; b < ml.length; b++) {
      if (!sorted.channels[ml[b].channel]) {
         sorted.channels[b] = { name: "", messages: [] };
      }
   }

   console.log("Messages were sorted. Outputting new state: ");
   console.log(sorted);

   return sorted;
}

export { updateStore, store };

/*

state: {
   channels: {
      id: {
         name: "",
         messages: []
      },
      id: {
         name: "",
         messages: []
      }
   }
}

*/