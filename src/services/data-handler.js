import React from "react";
import { createStore } from "redux";

// const combined = combineReducers(messageReducer);
const store = createStore(updateStore);

function updateStore(state = { messages: [], channels: [] }, action) {
   console.log("update:");
   console.log(state);
   console.log(action);
   if (action.messages) {
      return { messages: state.messages.concat(action.messages), channels: [] };
   } else {
      return { messages: [], channels: [] };
   }
}

export { updateStore, store };