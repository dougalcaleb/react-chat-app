import React from "react";
import "../styles/index.css";
import Message from "./message";
import { sendMessage, messageList } from "../services/message-handler";
import { store } from "../services/data-handler";
import { v4 as uuidv4 } from "uuid";
import { userData } from "../App";
import {
  GroupMessage,
  TopGroupMessage,
  BottomGroupMessage,
} from "./groupMessage";

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
    console.log(msgs);
    while (msgs.length > messagesToShow) {
      msgs.shift();
    }
    const messages = msgs.map((msg) => {
      if (epico < 73 && epico < msgs.length - 2) {
        epico++;
        console.log(epico);
        console.log(msgs[epico].text);
      }
      let sent;
      if (userData.uuid == msg.uuid) {
        sent = "sent";
      }
      if (msgs.length > 2) {
        if (
          msgs[epico].uuid == msgs[epico + 1].uuid &&
          msgs[epico].uuid !== msgs[epico - 1].uuid
        ) {
          console.log("this is for some reason the bottom");
          return (
            <BottomGroupMessage message={msg.text} key={uuidv4()} clas={sent} pic={msg.pic}/>
          );
        } else if (
          msgs[epico].uuid != msgs[epico - 1].uuid &&
          msgs[epico].uuid == msgs[epico + 1].uuid
        ) {
          console.log("bruh");
          return (
            <TopGroupMessage
              pic={msg.pic}
              message={msg.text}
              key={uuidv4()}
              clas={sent}
              name={msg.displayName}
            />
          );
        } else if (msgs[epico].uuid == msgs[epico - 1].uuid) {
          if (msgs[epico].uuid == msgs[epico + 1].uuid) {
            return (
              <GroupMessage message={msg.text} key={uuidv4()} clas={sent} />
            );
          } else {
            return (
              <GroupMessage message={msg.text} key={uuidv4()} clas={sent} />
            );
          }
        } else {
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
        }
      } else {
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
      }
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
