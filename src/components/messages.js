import React from "react";
import '../styles/index.css';
import Message from './message';
import { sendMessage, messageList } from "../services/message-handler";
import { store } from "../services/data-handler";

class Messages extends React.Component {
   constructor(props) {
      super(props);

      // this.state = {
      //    messsages: []
      // };
      this.unsub = null;
   }

   componentDidMount = () => {
      this.unsub = store.subscribe(this.handleNewMessage);
   }

   componentWillUnmount = () => {
      this.unsub();
   }

   handleNewMessage = () => {
      console.log("Store was updated. Outputting new messages list:");
      console.log(store.getState().messages);
      this.setState({
         messages: store.getState().messages,
      });
   }
   
   handleMessageSend = () => {
      sendMessage(document.querySelector(".pendingMessage").value, "sent");
      document.querySelector(".pendingMessage").value = "";
   }
   handleKeyDown = (e) => {
      switch (e.key) {
         case "Enter":
            this.handleMessageSend();
            break;
      }
   }
   addNewMessage = (msg) => {
      console.log("New message, poggers");
   }
   render() {
      // store.subscribe(this.addNewMessage);


      // console.log("Message list is:");
      // console.log(this.state.messages);
      const messages = store.getState().messages.map((msg, who) => {
         return (<Message
            name={msg.displayName}
            message={msg.text}
            time={msg.timestamp}
            pic={msg.pic}
            key={msg.timestamp}
            clas={"messageWrap " + who}
         />)
      });
      return (
         <div className="messages">
            <div className="chat">
               <Message
                  name="Anders"
                  message="EBICCOO"
                  clas="messageWrap sent"
                  time={1609861938035}
               />

               {messages}

            </div>
            <div className="sendMessage">
               <input type="text" placeholder="Message epic channel" className="pendingMessage" onKeyPress={this.handleKeyDown}/>
               <button onClick={this.handleMessageSend}>Send</button>
            </div>
         </div>
      )
   }
}

export default Messages;

