import React, { Component } from "react";
import "../styles/index.css";

export class GroupMessage extends Component {
  render() {
    return (
      <div className={this.props.clas + " messageWrap groupMessage"}>
        <div className="message">
          <img />
          <p className="Message">{this.props.message}</p>
        </div>
      </div>
    );
  }
}
export class TopGroupMessage extends Component {
  render() {
    return (
      <div className={this.props.clas + " messageWrap groupMessage"}>
        <h6>{this.props.name}</h6>
        <div className="message">
        <img src={this.props.pic} className="topImg"/>
          <p className="Message">{this.props.message}</p>
        </div>
      </div>
    );
  }
}
export class BottomGroupMessage extends Component {
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
    return "Just now";
  }
  render() {
    return (
      <div className={this.props.clas + " messageWrap groupMessage"}>
        <div className="message">
        <img src={this.props.pic} className="topImg"/>
          <p className="Message">{this.props.message}</p>
        </div>
        <h6>{this.getTime(Date.now() - (Date.now() - this.props.time))}</h6>
      </div>
    );
  }
}