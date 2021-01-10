import { createStore } from "redux";

// const combined = combineReducers(messageReducer);
let defaultedState = {
   channels: [
      {
         id: 0,
         name: "general",
         messages: []
      }
   ],
   activeChannel: 0
}
const store = createStore(updateStore);

function updateStore(state = defaultedState, action) {
   switch (action.type) {
      case "UPDATE_MESSAGE_LIST":
         let channelToUpdate;
         if (action.channelToUpdate) {
            channelToUpdate = action.channelToUpdate;
            // console.log("Given a specific channel to update: " + action.channelToUpdate);
         } else {
            channelToUpdate = state.activeChannel;
            // console.log("Not given a specific channel. Updating active");
         }
         let updatedChannel = state.channels[channelToUpdate];
         updatedChannel.messages = action.messages;
         let fullChannels = state.channels;
         fullChannels[channelToUpdate] = updatedChannel;
         // console.log("UPDATE_MESSAGE_LIST called, returning:", { channels: fullChannels, activeChannel: state.activeChannel });
         return { channels: fullChannels, activeChannel: state.activeChannel };
      case "UPDATE_CHANNELS":
         let newChannelList = [];
         action.channel.forEach(function (c) {
            c.messages = [];
            newChannelList[c.id] = c;
         });
         // console.log("UPDATE_CHANNELS called, outputting return: ",{ channels: newChannelList, activeChannel: state.activeChannel })
         return { channels: newChannelList, activeChannel: state.activeChannel };
      case "UPDATE_CHNLS":
         return { channels: [...state.channels, { name: action.channelName, messages: [], id: state.channels.length }], activeChannel: state.activeChannel };
      case "SET_CHNLS":
         return { channels: action.data, activeChannel: state.activeChannel };
      case "SWITCH_CHNL":
         return { channels: state.channels, activeChannel: action.switchToChannel };
      default:
         return state;
   }
}

export { updateStore, store };