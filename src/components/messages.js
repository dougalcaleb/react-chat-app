import React from "react";
import "../styles/index.css";
import Message from "./message";
import {sendMessage} from "../services/message-handler";
import {store} from "../services/data-handler";
import {v4 as uuidv4} from "uuid";
import {userData} from "../App";
// import {GroupMessage, TopGroupMessage, BottomGroupMessage} from "./groupMessage";
// import { activeChannel } from "../services/message-handler";

export const messagesToShow = 75;
const throttleTime = 500;

class Messages extends React.Component {
	constructor(props) {
		super(props);
		this.unsub = null;
      this.throttler = 0;
      this.text = "";
	}
	componentDidMount = () => {
		this.unsub = store.subscribe(this.handleNewMessage);
	};

	componentWillUnmount = () => {
		this.unsub();
	};

	handleNewMessage = () => {
		// console.log("Store was updated. Outputting new STATE:");
		// console.log(store.getState());
		this.setState({
			messages: store.getState().messages,
		});
	};

   handleMessageSend = () => {
      if (Date.now() - this.throttler > throttleTime) {
         // console.log(`${Date.now()} - ${this.throttler} = ${Date.now() - this.throttler}`);
         // console.log("message:", document.querySelector(".pendingMessage").value);
		   sendMessage(this.text);
         document.querySelector(".pendingMessage").value = "";
         this.throttler = Date.now();
      }
	};
	handleKeyDown = (e) => {
		switch (e.key) {
			case "Enter":
				this.handleMessageSend();
            break;
		}
   };
   handleKeyPress = (e) => {
      this.text = e.target.value;
   }
	render() {
		// console.log("messages in current channel:", store.getState().channels[store.getState().activeChannel].messages);
		// let epico = 0;
		const msgs = store.getState().channels[store.getState().activeChannel].messages;
		while (msgs.length > messagesToShow) {
			msgs.shift();
			// epico++;
		}
		// console.log("Trimmed msgs. Outputting:");
		// console.log(msgs);
		const messages = msgs.map((msg) => {
			// if (epico < 73 && epico < msgs.length - 2) {
				// epico++;
				//   console.log(epico);
				//   console.log(msgs[epico].text);
			// }
			let sent;
			if (userData.uuid === msg.uuid) {
				sent = "sent";
			}
			// if (msgs.length > 2) {
			// 	if (msgs[epico].uuid === msgs[epico + 1].uuid && msgs[epico].uuid !== msgs[epico - 1].uuid) {
			// 		//   console.log("this is for some reason the bottom");
			// 		return <BottomGroupMessage message={msg.text} key={uuidv4()} clas={sent} pic={msg.pic} />;
			// 	} else if (msgs[epico].uuid !== msgs[epico - 1].uuid && msgs[epico].uuid === msgs[epico + 1].uuid) {
			// 		// console.log("bruh");
			// 		return <TopGroupMessage pic={msg.pic} message={msg.text} key={uuidv4()} clas={sent} name={msg.displayName} />;
			// 	} else if (msgs[epico].uuid === msgs[epico - 1].uuid) {
			// 		if (msgs[epico].uuid === msgs[epico + 1].uuid) {
			// 			return <GroupMessage message={msg.text} key={uuidv4()} clas={sent} />;
			// 		} else {
			// 			return <GroupMessage message={msg.text} key={uuidv4()} clas={sent} />;
			// 		}
			// 	} else {
			// 		return <Message name={msg.displayName} message={msg.text} time={msg.timestamp} pic={msg.pic} key={uuidv4()} clas={sent} />;
			// 	}
			// } else {
				return <Message name={msg.displayName} message={msg.text} time={msg.timestamp} pic={msg.pic} key={uuidv4()} clas={sent} />;
			// }
		});

		return (
			<div className="messages">
				<div className="chat">{messages}</div>
				<div className="sendMessage">
					<input type="text" placeholder="Message channel" className="pendingMessage" onKeyPress={this.handleKeyDown} onKeyUp={this.handleKeyPress} />
					<button onClick={this.handleMessageSend}>Send</button>
				</div>
			</div>
		);
	}
}

export default Messages;