import React from 'react';

export default class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.props.name = props.name;
		this.state = {time: new Date().toLocaleString()};
	}
	
	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			1000
		);
	}
	
	tick() {
		var newTime = new Date();
		var secondAngle = newTime.getSeconds() * 6;
		var minuteAngle = newTime.getMinutes() * 6;
		var hourAngle = 0;
		
		if(newTime.getHours() >= 12) {
			hourAngle = (newTime.getHours()-12) * 30;
		} else {
			hourAngle = newTime.getHours() * 30;
		}
		
		var secondStyle = {
			transform: 'rotate('+secondAngle+'deg)'
		}
		var minuteStyle = {
			transform: 'rotate('+minuteAngle+'deg)'
		}
		var hourStyle = {
			transform: 'rotate('+hourAngle+'deg)'
		}
		this.setState({
			time: newTime.toLocaleString(),
			second: secondStyle,
			minute: minuteStyle,
			hour: hourStyle
		});
	}
	
	render() {
		return <div className='clock'>
			<link rel="stylesheet" href="../../assets/css/modules/react-upskill/clock.css" type="text/css" />
			<h1>Hi {this.props.name},</h1>
			<p>The time is currently:</p>
			<div id="clock-face">
				<div id="second-hand" className="hand" style={this.state.second}></div>
				<div id="minute-hand" className="hand" style={this.state.minute}></div>
				<div id="hour-hand" className="hand" style={this.state.hour}></div>
			</div>
			<p>{this.state.time}</p>
		</div>
	}
}
