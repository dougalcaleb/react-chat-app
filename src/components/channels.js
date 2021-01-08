import React from "react";
import { store } from "../services/data-handler";
import Channel from "./channel";

class Channels extends React.Component {
   render() {
      const c = store.getState().channels;
      const chans = c.map((channel) => {

      });
      return ();
   }
}

export default Channels;