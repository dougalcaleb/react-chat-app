import React from "react";
import {store} from "../services/data-handler";
import Channel from "./channel";
import {v4 as uuidv4} from "uuid";

class Channels extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.unsub = null;
	// }
	// componentDidMount = () => {
	// 	this.unsub = store.subscribe(this.handleNewMessage);
	// };

	// componentWillUnmount = () => {
	// 	this.unsub();
   // };
   
	render() {
		let num = -1;
		const c = store.getState().channels;
		const chans = c.map((channel) => {
			num++;
			if (store.getState().channels[num]) {
				return <Channel channelId={num} key={uuidv4()} />;
			}
			return;
		});
		return <div className="channel">{chans}</div>;
	}
}

export default Channels;