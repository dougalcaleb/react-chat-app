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
      sendMessage(document.querySelector(".pendingMessage").value);
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
      const messages = store.getState().messages.map((msg) => {
         return (<Message
            name={msg.displayName}
            message={msg.text}
            time={msg.timestamp}
            pic={msg.pic}
            key={msg.timestamp}
            clas="messageWrap sent"
         />)
      });
      return (
         <div className="messages">
            <div className="chat">
               {/* <div className="message recieved">What's poppin</div>
               <div className="message sent">Brand new whip just hopped in</div>
               <div className="message recieved">I got options</div>
               <div className="message sent">I could pass that snitch like Stockton</div>
               <div className="message recieved">Just joshin</div>
               <div className="message sent">Ima spend my holiday locked in</div>
               <div className="message recieved">My body got rid of them toxins</div>
               <div className="message sent">Sportscenter, top ten</div> */}
               <Message
                  name="Anders"
                  message="EBICCOO"
                  className="messageWrap recieved"
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

