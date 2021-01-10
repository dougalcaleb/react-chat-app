import React from "react";
import { store } from "../services/data-handler";
import Messages from "./messages";


class Channel extends React.Component {
   render() {
      // const messages = store.getState().channels
      // console.log("Rendering channel", this.props.channelId, "with messages", store.getState().channels[this.props.channelId].messages);
      return (
         <div>
            <Messages/>
         </div>
      );
   }
}

export default Channel;