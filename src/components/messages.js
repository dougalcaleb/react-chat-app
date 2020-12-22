import React from "react";
import '../styles/index.css';
import Message from './message';

const Messages = () => {
    return(
        <div className="messages">
            <div className="chat">
                <div className="message recieved">What's poppin</div>
                <div className="message sent">Brand new whip just hopped in</div>
                <div className="message recieved">I got options</div>
                <div className="message sent">I could pass that snitch like Stockton</div>
                <div className="message recieved">Just joshin</div>
                <div className="message sent">Ima spend my holiday locked in</div>
                <div className="message recieved">My body got rid of them toxins</div>
                <div className="message sent">Sportscenter, top ten</div>
                <Message
                    name="Anders"
                    message="EBICCOO"
                />
            </div>
            <div className="sendMessage">
                <input type="text" placeholder="Message epic channel"/>
                <button>Send</button>
            </div>
        </div>
    )
}

export default Messages