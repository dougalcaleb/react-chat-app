import React, { Component } from "react";
import "../styles/index.css";

export class Message extends Component {
  getTime(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  render() {
    return (
      <div className="messageWrap recieved">
        <h6>{this.props.name}</h6>
        <div className="message">
          <img src={this.props.pic} />
          <p className="Message">{this.props.message}</p>
        </div>
        <h6>{this.getTime(Date.now() - 600000)}</h6>
      </div>
    );
  }
}

export default Message;
