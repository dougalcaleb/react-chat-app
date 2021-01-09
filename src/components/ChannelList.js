import React from "react";
import "../styles/index.css";
import { store } from "../services/data-handler";
import { newChannel } from "../services/message-handler";
import { v4 as uuidv4 } from "uuid";
// import { activeChannel } from "../services/message-handler";

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

   switchToChannel = (id, name) => {
      store.dispatch({type: "SWITCH_CHNL", switchToChannel: id});
   }
   
   setActiveStyle = (e) => {
      console.log(e.target);
      document.querySelector(".active-channel-name").classList.remove("active-channel-name");
      e.target.classList.add("active-channel-name");
   }

	createNewChannel = () => {
		if (document.querySelector(".new-channel-input").value !== "") {
			// store.dispatch({type: "UPDATE_CHNLS", channelName: document.querySelector(".new-channel-input").value});
			// console.log("Updated Channels. State:");
         // console.log(store.getState());
         newChannel(document.querySelector(".new-channel-input").value);
         document.querySelector(".new-channel-input").value = "";
		}
   };
   

   //! PROBLEMS:
   /*
   - Only one onClick event per element, but the li needs two: one for dispatching to the store and one for giving it active class styling. Both functionalities need to be consolidated into one function.
   - Input box is not being cleared when sending a message
   */




   render() {
      const listOfChannels = store.getState().channels.map((c) => {
         return <li onClick={() => this.switchToChannel(c.id, c.name)} onClick={this.setActiveStyle} key={uuidv4()} className={c.id == 0 ? "active-channel-name" : ""}>{c.name}</li>;
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
