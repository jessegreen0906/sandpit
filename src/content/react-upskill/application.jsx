import React from 'react';
import UserInput from "./user-input";
import Clock from "./clock";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.output = <UserInput/>;
		this.state = {};
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	onSubmit(name) {
		this.setState({name: name, submitted: true});
	}
	render() {
		if (!this.state.submitted) {
			return <UserInput onSubmit={this.onSubmit}/>;
		} else {
			return <Clock name={this.state.name} time />
		}
	}
}
