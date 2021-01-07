import React from "react";
import "../styles/index.css";
import Message from "./message";
import {sendMessage, messageList} from "../services/message-handler";
import {store} from "../services/data-handler";
import {v4 as uuidv4} from "uuid";

const messagesToShow = 75;

class Messages extends React.Component {
	constructor(props) {
		super(props);
		this.unsub = null;
	}
	//    updateScroll(){
	//     var element = document.getElementById("yourDivID");
	//     element.scrollTop = element.scrollHeight;
	// }
	componentDidMount = () => {
		this.unsub = store.subscribe(this.handleNewMessage);
	};

	componentWillUnmount = () => {
		this.unsub();
	};

	handleNewMessage = () => {
      console.log("Store was updated. Outputting new messages list:");
      console.log(store.getState().messages);
		this.setState({
			messages: store.getState().messages,
		});
	};

	handleMessageSend = () => {
		sendMessage(document.querySelector(".pendingMessage").value, "sent");
		document.querySelector(".pendingMessage").value = "";
	};
	handleKeyDown = (e) => {
		switch (e.key) {
			case "Enter":
				this.handleMessageSend();
				break;
		}
	};
	render() {
		const msgs = store.getState().messages;
      while (msgs.length > messagesToShow) {
         msgs.shift();
      }
		const messages = msgs.map((msg) => {
			return <Message name={msg.displayName} message={msg.text} time={msg.timestamp} pic={msg.pic} key={uuidv4()} clas={msg.who} />;
		});

		return (
			<div className="messages">
				<div className="chat">{messages}</div>
				<div className="sendMessage">
					<input type="text" placeholder="Message epic channel" className="pendingMessage" onKeyPress={this.handleKeyDown} />
					<button onClick={this.handleMessageSend}>Send</button>
				</div>
			</div>
		);
	}
}
export default Messages;
