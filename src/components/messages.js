import React from "react";
import "../styles/index.css";
import Message from "./message";
import { sendMessage, messageList } from "../services/message-handler";
import { store } from "../services/data-handler";
import { v4 as uuidv4 } from "uuid";
import { userData } from "../App";

const messagesToShow = 75;

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.unsub = null;
  }
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
    sendMessage(document.querySelector(".pendingMessage").value);
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
    let epico = 0;
    const msgs = store.getState().messages;
    while (msgs.length > messagesToShow) {
      msgs.shift();
      //   epico++;
    }
    const messages = msgs.map((msg) => {
      if (epico < 73) {
        epico++;
      }
      let sent;
      if (userData.uuid == msg.uuid) {
        sent = "sent";
      }
    //   if (msgs[epico].uuid == msgs[epico + 1].uuid) {
    //     while (msgs[epico].uuid == msgs[epico + 1].uuid) {
    //       console.log("same");
        //   return (
        //     <Message
        //       name={msg.displayName}
        //       message={msgs[epico].text + " <br/> " + msgs[epico + 1].text}
        //       time={msg.timestamp}
        //       pic={msg.pic}
        //       key={uuidv4()}
        //       clas={sent}
        //     />
        //   );
        // }
    //   } else {
        return (
          <Message
            name={msg.displayName}
            message={msg.text}
            time={msg.timestamp}
            pic={msg.pic}
            key={uuidv4()}
            clas={sent}
          />
        );
    //   }
    });

    return (
      <div className="messages">
        <div className="chat">{messages}</div>
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
