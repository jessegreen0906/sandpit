import React from 'react';

export default class UserInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(event) {
		event.preventDefault();
		this.props.onSubmit(event.target.getElementsByClassName("name")[0].value);
	}
	render() {
		return <div className="user-input">
			<form onSubmit={this.handleSubmit}>
				<div class="form-input">
					<label>What's your name</label>
					<input className="name" type="text" value={this.props.name} />
				</div>
				<input type="submit" value="Submit" />
			</form>
		</div>
	}
}