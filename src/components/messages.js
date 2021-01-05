import React, { Component } from "react";
import '../styles/index.css';
import Message from './message';
import { userData } from "../App";

export class Messages extends Component {
    newMessage() {
        <Message 
        name={userData.displayName}
        message={document.querySelector(".newMessage").value}
        pic={userData.photoURL}
        clas="messageWrap sent"
        />
        document.querySelector(".newMessage").value = "";
    }
    render() {
        return(
            <div className="messages">
                <div className="chat">
                    <Message
                        name={userData.displayName}
                        message="EBICCOO"
                        pic={userData.photoURL}
                        clas="messageWrap recieved"
                    />
                </div>
                <div className="sendMessage">
                    <input type="text" placeholder="Message epic channel" className="newMessage"/>
                    <button onClick={this.newMessage}>Send</button>
                </div>
            </div>
        )
    }
}

export default Messages