import React, { Component } from 'react'

export default class List extends Component {
	render() {
		return (
			<div>
				<input />
				<button onClick={ this.handleClick }>add</button>
			</div>
		)
	}
	handleClick(){
		console.log("click")
	}
}