import React from "react";
import "../styles/index.css";
import Message from "./message";
import { sendMessage, messageList } from "../services/message-handler";
import { store } from "../services/data-handler";
import { v4 as uuidv4 } from "uuid";

class Messages extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //    messsages: []
    // };
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
    this.setState({
      messages: store.getState().messages,
    });
  };

  handleMessageSend = () => {
    sendMessage(document.querySelector(".pendingMessage").value, "sent");
    document.querySelector(".pendingMessage").value = "";
    //   this.updateScroll()
  };
  handleKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
        this.handleMessageSend();
        break;
    }
  };
  addNewMessage = (msg) => {
    console.log("New message, poggers");
  };
  render() {
    const messages = store.getState().messages.map((msg) => {
      return (
        <Message
          name={msg.displayName}
          message={msg.text}
          time={msg.timestamp}
          pic={msg.pic}
          key={uuidv4()}
          clas={msg.who}
        />
      );
    });
     
    return (
      <div className="messages">
        <div className="chat">

          {messages}
        </div>
        <div className="sendMessage">
          <input
            type="text"
            placeholder="Message epic channel"
            className="pendingMessage"
            onKeyPress={this.handleKeyDown}
          />
          <button onClick={this.handleMessageSend}>Send</button>
        </div>
      </div>
    );
  }
}
export default Messages;
