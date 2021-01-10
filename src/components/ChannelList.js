import React from "react";
import "../styles/index.css";
import { store } from "../services/data-handler";
import { newChannel, getMessagesFromChannel } from "../services/message-handler";
import { v4 as uuidv4 } from "uuid";

class ChannelList extends React.Component {
   constructor() {
      super();

      this.unsub = null;
   }
	componentDidMount = () => {
		this.unsub = store.subscribe(this.handleNewChannel);
	};

	componentWillUnmount = () => {
		this.unsub();
   };

   handleKeyDown = (e) => {
      switch (e.key) {
        case "Enter":
          this.createNewChannel();
          break;
      }
    };
   
   handleNewChannel = () => {
      this.setState({
         channels: store.getState().channels
      })
   }

   switchToChannel = async (id, name) => {
      await getMessagesFromChannel(id);
      store.dispatch({ type: "SWITCH_CHNL", switchToChannel: id });
   }

	createNewChannel = () => {
		if (document.querySelector(".new-channel-input").value !== "") {
         newChannel(document.querySelector(".new-channel-input").value);
         document.querySelector(".new-channel-input").value = "";
		}
   };
   
   render() {
      // console.log("Rendering channel list. Outputting state: ");
      // console.log(store.getState());
      const listOfChannels = store.getState().channels.map((c) => {
         // console.log("returning channel " + c.id);
         return <li onClick={() => this.switchToChannel(c.id, c.name)} key={uuidv4()} className={c.id === store.getState().activeChannel ? `channel-${c.id} active-channel-name` : `channel-${c.id}`}>{c.name}</li>;
		});
		return (
			<div className="channels">
				<h3>Channels</h3>
				<ul className="channel-list">{listOfChannels}</ul>
				<div className="channel-tools">
					<input placeholder="New channel name" className="new-channel-input" type="text" onKeyPress={this.handleKeyDown} />
					<button className="new-channel-add" onClick={this.createNewChannel}>
						Create
					</button>
				</div>
			</div>
		);
	}
}

export default ChannelList;
