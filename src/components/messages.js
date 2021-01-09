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
// import { activeChannel } from "../services/message-handler";

export const messagesToShow = 75;

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
    console.log("Store was updated. Outputting new STATE:");
    console.log(store.getState());
    this.setState({
      messages: store.getState().messages,
    });
  };

   handleMessageSend = () => {
     console.log("message:",document.querySelector(".pendingMessage"))
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
      console.log("messages in current channel:", store.getState().channels[store.getState().activeChannel].messages);
    let epico = 0;
    const msgs = store.getState().channels[store.getState().activeChannel].messages;
    while (msgs.length > messagesToShow) {
      msgs.shift();
        epico++;
     }
     console.log("Trimmed msgs. Outputting:");
     console.log(msgs);
     const messages = msgs.map((msg) => {
        if (epico < 73 && epico < msgs.length - 2) {
           epico++;
         //   console.log(epico);
         //   console.log(msgs[epico].text);
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
            //   console.log("this is for some reason the bottom");
              return (
                 <BottomGroupMessage message={msg.text} key={uuidv4()} clas={sent} pic={msg.pic} />
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
