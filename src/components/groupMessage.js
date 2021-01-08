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

export default GroupMessage;